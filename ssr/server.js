import fs from "fs";
// TODO: 本当はここでS3から持ってくる
const script = fs.readFileSync("../dist/bundle.js");

import vm from "vm";
const vmScript = new vm.Script(script);

import Fastify from "fastify";
const fastify = Fastify({
  // logger: true,
});

fastify.post("/", async (request, reply) => {
  try {
    const { rootComponentName, rootProps, provided } = request.body;
    const context = vm.createContext({
      rootComponentName,
      rootProps,
      provided,
    });
    vmScript.runInContext(context, { timeout: 500 });
    const result = await context.promise;
    reply.code(200).send({ result });
  } catch (e) {
    console.error({ requestBody: request.body }, e);
    reply.code(400).send({ error: `${e}` });
  }
});

fastify.listen({ port: 3001, host: "0.0.0.0" });

process.once("SIGTERM", async () => {
  console.log("SIGTERM received.");
  fastify.close();
});
