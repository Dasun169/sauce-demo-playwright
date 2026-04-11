FROM node:20-slim

# Install Java 17 for Allure reports
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Java home
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Install Playwright dependencies
RUN apt-get update && \
    apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libxkbcommon0 \
    wget \
    curl \
    unzip \
    fonts-noto-color-emoji \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY playwright.config.ts ./

# Install dependencies
RUN npm ci

# Copy ALL source code
COPY . .

# Use app-local browser path for CI safety
ENV PLAYWRIGHT_BROWSERS_PATH=0

# Install Playwright browsers
RUN npx playwright install --with-deps chrome firefox webkit

# Verify installations
RUN echo "Node version: $(node --version)" && \
    echo "NPM version: $(npm --version)" && \
    echo "Java version: $(java -version 2>&1 | head -1)" && \
    echo "Playwright browsers installed:" && \
    npx playwright --version && \
    npx playwright install --help | head -5 && \
    echo "Checking browser installations..." && \
    ls -la /root/.cache/ms-playwright/ || echo "No browsers found in cache"

# Create necessary directories
RUN mkdir -p /app/logs && \
    mkdir -p /app/screenshots && \
    mkdir -p /app/reports/{html,junit-report,allure-results,json-report} && \
    mkdir -p /app/src/test-results && \
    chmod -R 777 /app/logs /app/screenshots /app/reports /app/src/test-results

# Set the command to run tests
CMD ["npx", "playwright", "test"]