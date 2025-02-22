pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                bat 'where node || (choco install nodejs-lts -y && refreshenv)'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Prepare Test Results Directory') {
            steps {
                bat 'mkdir test-results'
            }
        }

        stage('Run Playwright Tests in Parallel') {
            parallel {
                stage('Shard 1') {
                    steps {
                        bat 'npx playwright test --shard=1/3 --reporter=junit --output=test-results'
                    }
                }
                stage('Shard 2') {
                    steps {
                        bat 'npx playwright test --shard=2/3 --reporter=junit --output=test-results'
                    }
                }
                stage('Shard 3') {
                    steps {
                        bat 'npx playwright test --shard=3/3 --reporter=junit --output=test-results'
                    }
                }
            }
        }

        stage('Publish Test Reports') {
            steps {
                junit 'test-results/*.xml' // Ensure Jenkins finds test results
            }
        }

        stage('Generate Playwright Report') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }
}
