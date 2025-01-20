pipeline {
   agent { 
    docker { 
        image 'mcr.microsoft.com/playwright:v1.49.1-noble'
        args '-v /c/ProgramData/Jenkins/.jenkins/workspace/playwright:/workspace -w /workspace'
        } 
    }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
}