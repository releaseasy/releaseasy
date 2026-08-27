import { checkGitRepoStatus } from "./steps/checkGitRepoStatus.js";
import { withTimer } from "./utils/index.js";

export async function release(optoins) {
  console.log("======release========");

  // // 验证git仓库状态
  await checkGitRepoStatus();
  /**
   * @typedef {Object} User
   * @property {string} name
   * @property {number} age
   * @property {string} email
   */

  /** @type {User} */
  const context = Object.create(null);

  // console.log('ww');

  // try {
  //   await withTimer(async () => {
  //     // 一系列的操作
  //     // ..
  //   });
  // } catch (err) {
  //   // await gitReset(context); // 回滚
  //   throw err;
  // }
}

//  async function createContext(
//   options,
// ){
//   const context = Object.create(null);

//   await collectGitContext(options, context);
//   await collectRepoContext(context);
//   await collectPackageContext(options, context);

//   context.initialRef = await getGitHead();

//   return {
//     ...context,
//     logger,
//     cancel(message?: string) {
//       throw new CancelledError(message);
//     },
//   };
// }
