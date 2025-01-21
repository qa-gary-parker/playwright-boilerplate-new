pipeline {
   agent any
   stages {
      stage('e2e-tests') {
         steps {
            sh '''
            docker run --rm \
               -v /c/ProgramData/Jenkins/.jenkins/workspace/playwright:/workspace \
               -w /workspace \
               mcr.microsoft.com/playwright:v1.49.1-noble \
               sh -c "npm ci && npx playwright test"
            '''
         }
      }
   }
}
