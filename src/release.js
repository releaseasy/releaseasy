export async function release(inlineConfig) {
  console.log(inlineConfig);

  // // 处理参数
  // const config = await resolveConfig(inlineConfig);
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
