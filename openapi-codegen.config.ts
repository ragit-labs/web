import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  ragitAPI: {
    from: {
      source: "url",
      url: "http://127.0.0.1:8000/openapi.json",
    },
    outputDir: "src/clients/api",
    to: async (context) => {
      const filenamePrefix = "ragitAPI";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
