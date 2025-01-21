pipeline {
   agent any
   stages {
      stage('e2e-tests') {
         steps {
            script {
               bat '''
                  docker run --rm ^
                  -v C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\playwright:/workspace ^
                  -w /workspace ^
                  mcr.microsoft.com/playwright:v1.49.1-noble ^
                  cmd.exe /c "npm ci && npx playwright test"
               '''
            }
         }
      }
   }
}
