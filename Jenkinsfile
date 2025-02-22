pipeline {
    agent any

    environment {
        NODE_VERSION = '18' // Adjust if necessary
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
                bat 'where node || choco install nodejs-lts' // Install Node.js if missing
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

        stage('Run Playwright Tests in Parallel') {
            parallel {
                stage('Shard 1') {
                    steps {
                        bat 'npx playwright test --shard=1/3 --reporter=dot,junit --output=test-results/shard1'
                    }
                }
                stage('Shard 2') {
                    steps {
                        bat 'npx playwright test --shard=2/3 --reporter=dot,junit --output=test-results/shard2'
                    }
                }
                stage('Shard 3') {
                    steps {
                        bat 'npx playwright test --shard=3/3 --reporter=dot,junit --output=test-results/shard3'
                    }
                }
            }
        }

        stage('Publish Test Reports') {
            steps {
                junit '**/test-results/**/*.xml'
            }
        }

        stage('Generate Playwright Report') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**', fingerprint: true
            bat 'rmdir /s /q test-results' // Cleanup for Windows
        }
        failure {
            echo "❌ Playwright tests failed. Check reports for details."
        }
        success {
            echo "✅ All Playwright tests passed successfully!"
        }
    }
}
