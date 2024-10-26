import { App } from "../../src/application/types";
import express, { Express } from 'express';

function run(app: App) {

}

async function runExpressServer(): Promise<void> {
  const app: Express = express();
  app.get('/', (req: any, res: any) => {
    res.send('Hello, World!');
  });
  app.listen(3000, () => {
    console.log('Express server is running on port 3000');
  });
}
export { run };
export { runExpressServer };