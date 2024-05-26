import { Faker } from "@faker-js/faker";
import {
  supportedLocalization,
  supportedLocalizationMap,
} from "../utils/mockApiConfiguration";
import {
  createRandomUser,
  generatePosts,
  generateComments,
  generateAlbums,
  generateReviews,
  generateTodos,
  generateAddresses,
  generateCompanies,
  generateProducts,
  generatePayments,
  generateVehicles,
  generateFiles,
  generateSocialMediaProfiles,
  generateEducationalInstitutions,
  generateFinancialTransactions,
  generateHealthRecords,
  generateRealEstateListings,
  generateTravelPlans,
  generateRecipes,
  generateOrders,
} from "../models/dataGenerationHelpers";
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
    console.log(`Requested locale: ${this.locale}`);
    console.log(`Mapped locale identifier: ${hl}`);

    try {
      const allLocales = await import("@faker-js/faker");
      this.faker = await allLocales[hl];
    } catch (err) {
      console.error("Invalid or unsupported locale", err);
      throw new Error("Invalid or unsupported locale");
    }
  }

  private handleSeed() {
    if (this.page) this.faker.seed(this.page);
    else if (this.seed) this.faker.seed(this.seed);
  }

  private generateData() {
    const generatorFunction = this.selectDataGenerator(this.niche, this.limit);
    this.data = generatorFunction();
  }

  private selectDataGenerator(niche: dataEntityType, limit: number) {
    switch (niche.toLowerCase()) {
      case "users":
        return () => createRandomUser(this.faker, limit);
      case "posts":
        return () => generatePosts(this.faker, limit);
      case "comments":
        return () => generateComments(this.faker, limit);
      case "albums":
        return () => generateAlbums(this.faker, limit);
      case "reviews":
        return () => generateReviews(this.faker, limit);
      case "todos":
        return () => generateTodos(this.faker, limit);
      case "addresses":
        return () => generateAddresses(this.faker, limit);
      case "companies":
        return () => generateCompanies(this.faker, limit);
      case "products":
        return () => generateProducts(this.faker, limit);
      case "payments":
        return () => generatePayments(this.faker, limit);
      case "vehicles":
        return () => generateVehicles(this.faker, limit);
      case "files":
        return () => generateFiles(this.faker, limit);
      case "socialmediaprofiles":
        return () => generateSocialMediaProfiles(this.faker, limit);
      case "educationalinstitutions":
        return () => generateEducationalInstitutions(this.faker, limit);
      case "financialtransactions":
        return () => generateFinancialTransactions(this.faker, limit);
      case "healthrecords":
        return () => generateHealthRecords(this.faker, limit);
      case "realestatelistings":
        return () => generateRealEstateListings(this.faker, limit);
      case "travelplans":
        return () => generateTravelPlans(this.faker, limit);
      case "recipes":
        return () => generateRecipes(this.faker, limit);
      case "orders":
        return () => generateOrders(this.faker, limit);
      default:
        console.error("Unsupported niche:", niche);
        return () => [];
    }
  }

  private transformData() {
    // sort
    sortByDynamicProperty(this.data, this.sortField, this.sortOrder);

    // filter
    // still thinking whether I should implement this feature
    // this.data.filter((ele) => {
    //   for(let key in this.filters){

    //     if(key in ele) parseFilter(this.filters[key], ele[key]);
    //     else return true;

    //   }
    // });
    // console.log("FILTERS: ", this.filters);
  }
}
