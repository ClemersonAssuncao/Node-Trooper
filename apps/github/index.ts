import { App } from "../../src/application/types";
import { exec } from 'child_process';

// Função para copiar commits do PR e criar um novo PR para outras branches

function run(app: App) {

}

const versioning = async (pullRequestId: string, versions: string[]) => {
  try {
    // Copiar commits do PR para cada uma das branches especificadas
    for (const version of versions) {
      const command = `git fetch origin pull/${pullRequestId}/head:pr_${pullRequestId}_branch_${version} && git push origin pr_${pullRequestId}_branch_${version}:${version}`;
      await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running command for version ${version}: ${error}`);
            reject(error);
          }
          resolve();
        });
      });
      console.log(`Commits copied from PR ${pullRequestId} to branch ${version}`);
    }
    console.log('New PRs successfully created for all versions');
  } catch (error) {
    console.error('An error occurred during versioning process:', error);
  }
};
export { run };
export { versioning };