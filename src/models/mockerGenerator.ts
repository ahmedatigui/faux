import { Faker } from "@faker-js/faker";
import {
  supportedLocalization,
  supportedLocalizationMap,
} from "../utils/mockApiConfiguration";
import { selectDataGenerator } from "../models/dataGenerationHelpers";
import { dataEntityType } from "../utils/types";
import { schemaProps } from "../utils/mockApiConfiguration";

export class mockerData {
  private faker: Faker;
  private data: any; // eslint-disable-line  @typescript-eslint/no-explicit-any

  constructor(
    private dataSchema: Array<string | object>,
    private seed?: number | undefined | null,
    private locale:
      | (typeof supportedLocalization)[number]
      | undefined
      | null = "en",
    private limit: number | undefined | null = 10,
    private page?: number | undefined | null,
  ) {}

  public async init() {
    // Locale
    await this.handleLocale();

    // Seed
    this.handleSeed();

    // Parse schema
    this.parseSchema();

    // Data
    this.generateData();

    return this.data;
  }

  private async handleLocale() {
    const hl = supportedLocalizationMap.get(this.locale ?? "en_US")[1] ?? "en";

    try {
      const allLocales = await import("@faker-js/faker");
      this.faker = await allLocales[hl];
    } catch (err) {
      throw new Error("Invalid or unsupported locale");
    }
  }

  private handleSeed() {
    if (this.page) this.faker.seed(this.page);
    else if (this.seed) this.faker.seed(this.seed);
  }

  private parseSchema() {
    this.dataSchema.map((ele) => {
      if (!Array.isArray(ele) && ele !== null && typeof ele === "object") {
        for (const key in ele) {
          const eleVal = ele[key].value && ele[key].value.toLowerCase();
          if (schemaProps.has(eleVal)) {
            const val = schemaProps.get(eleVal);
            const options = ele[key].options
              ? JSON.stringify(ele[key].options)
              : JSON.stringify({});

            const functionBody = `return this.faker.${val}(${options})`;
            ele[key] = new Function(functionBody).bind(this);
          }
        }
      }
    });
  }

  private generateData() {
    this.data = this.faker.helpers.multiple(
      () =>
        this.dataSchema.map((ele: object | dataEntityType) => {
          if (!Array.isArray(ele) && ele !== null && typeof ele === "object") {
            const newEle = { ...ele };
            for (const key in newEle) {
              if (typeof newEle[key] === "function") {
                newEle[key] = newEle[key]();
              } else if (typeof newEle[key] === "string")
                newEle[key] = selectDataGenerator(this.faker, newEle[key], 1);
            }
            return newEle;
          } else if (typeof ele === "string")
            return selectDataGenerator(this.faker, ele, 1);
        }),
      { count: this.limit },
    );
  }
}
