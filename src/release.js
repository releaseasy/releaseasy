export async function release(optoins) {
  console.log("qq");

  console.log(optoins);

  const config = await resolveConfig(optoins);
  // // 验证git仓库状态
  // await checkGitRepoStatus(config);
  // const context = await createContext(config);

  // try {
  //   await withTimer(async () => {
  //     await runTasks(steps, config, context);
  //   });
  // } catch (err) {
  //   await effect(config, `run git reset`, async () => {
  //     await gitReset(context); // 回滚
  //   });
  //   throw err;
  // }
}
