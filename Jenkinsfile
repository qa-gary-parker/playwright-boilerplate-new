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
                script {
                    def nodeExists = sh(script: 'which node', returnStatus: true) == 0
                    if (!nodeExists) {
                        sh "curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -"
                        sh "apt-get install -y nodejs"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests in Parallel') {
            parallel {
                stage('Shard 1') {
                    steps {
                        sh 'npx playwright test --shard=1/3 --reporter=dot,junit --output=test-results/shard1'
                    }
                }
                stage('Shard 2') {
                    steps {
                        sh 'npx playwright test --shard=2/3 --reporter=dot,junit --output=test-results/shard2'
                    }
                }
                stage('Shard 3') {
                    steps {
                        sh 'npx playwright test --shard=3/3 --reporter=dot,junit --output=test-results/shard3'
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
                sh 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**', fingerprint: true
            sh 'rm -rf test-results' // Cleanup
        }
        failure {
            echo "❌ Playwright tests failed. Check reports for details."
        }
        success {
            echo "✅ All Playwright tests passed successfully!"
        }
    }
}
