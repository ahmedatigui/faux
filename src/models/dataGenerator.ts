import { Faker } from "@faker-js/faker";
import {
  supportedLocalization,
  supportedLocalizationMap,
} from "../utils/mockApiConfiguration";
import { selectDataGenerator } from "../models/dataGenerationHelpers";
import { dataEntityType, sortOrder } from "../utils/types";
import { sortByDynamicProperty } from "../utils/helpers";
// import { parseFilter } from "../validators/queryParser";

export class Data {
  private faker: Faker;
  private data: any; // eslint-disable-line  @typescript-eslint/no-explicit-any

  constructor(
    private seed?: number | undefined | null,
    private locale:
      | (typeof supportedLocalization)[number]
      | undefined
      | null = "en",
    private limit: number | undefined | null = 10,
    private niche: dataEntityType | undefined | null = "users",
    private sortField?: string | undefined | null,
    private sortOrder?: sortOrder | undefined | null,
    // private filters?: any | undefined | null,
    private page?: number | undefined | null,
  ) {}

  public async init() {
    // Locale
    await this.handleLocale();

    // Seed
    this.handleSeed();

    // Data
    this.generateData();

    // Data transformations
    this.transformData();

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

  private generateData() {
    const generatorFunction = selectDataGenerator(
      this.faker,
      this.niche,
      this.limit,
    );
    this.data = generatorFunction;
  }

  private transformData() {
    // sort
    sortByDynamicProperty(this.data, this.sortField, this.sortOrder);

    // filter
    // NOTE: still thinking whether I should implement this feature
    // this.data.filter((ele) => {
    //   for(let key in this.filters){

    //     if(key in ele) parseFilter(this.filters[key], ele[key]);
    //     else return true;

    //   }
    // });
    // console.log("FILTERS: ", this.filters);
  }
}
