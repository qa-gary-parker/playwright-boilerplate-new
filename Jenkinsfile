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

        stage('Run Playwright Tests in Parallel') {
            parallel {
                stage('Shard 1') {
                    steps {
                        bat 'npx playwright test --shard=1/3 --reporter=blob --output=test-results/shard1'
                    }
                }
                stage('Shard 2') {
                    steps {
                        bat 'npx playwright test --shard=2/3 --reporter=blob --output=test-results/shard2'
                    }
                }
                stage('Shard 3') {
                    steps {
                        bat 'npx playwright test --shard=3/3 --reporter=blob --output=test-results/shard3'
                    }
                }
            }
        }

        stage('Merge Test Reports') {
            steps {
                bat 'npx playwright merge-reports test-results/shard1 test-results/shard2 test-results/shard3 --reporter=html,junit'
            }
        }

        stage('Publish Test Reports') {
            steps {
                junit 'playwright-report/junit.xml' // Use merged JUnit report
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
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
        cleanup {
            bat 'rmdir /s /q test-results' // Cleanup raw test results
        }
        failure {
            echo "❌ Playwright tests failed. Check reports for details."
        }
        success {
            echo "✅ All Playwright tests passed successfully!"
        }
    }
}
