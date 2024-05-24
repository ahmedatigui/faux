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
import { dataEntityType } from "../utils/types";
import { Faker } from "@faker-js/faker";

export class Data {
  private faker: Faker;
  private data: any; // eslint-disable-line  @typescript-eslint/no-explicit-any

  constructor(
    private seed?: number | undefined | null,
    private locale?: (typeof supportedLocalization)[number] | undefined | null,
    private count?: number | undefined | null,
    private niche?: dataEntityType | undefined | null,
  ) {}

  public async init() {
    // Locale
    await this.handleLocale();

    // Seed
    this.handleSeed();

    // Data
    this.generateData();

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
    this.seed ? this.faker.seed(this.seed) : this.faker.seed();
  }

  private generateData() {
    const generatorFunction = this.selectDataGenerator(this.niche, this.count);
    this.data = generatorFunction();
  }

  private selectDataGenerator(niche: dataEntityType, count: number) {
    switch (niche.toLowerCase()) {
      case "users":
        return () => createRandomUser(this.faker, count);
      case "posts":
        return () => generatePosts(this.faker, count);
      case "comments":
        return () => generateComments(this.faker, count);
      case "albums":
        return () => generateAlbums(this.faker, count);
      case "reviews":
        return () => generateReviews(this.faker, count);
      case "todos":
        return () => generateTodos(this.faker, count);
      case "addresses":
        return () => generateAddresses(this.faker, count);
      case "companies":
        return () => generateCompanies(this.faker, count);
      case "products":
        return () => generateProducts(this.faker, count);
      case "payments":
        return () => generatePayments(this.faker, count);
      case "vehicles":
        return () => generateVehicles(this.faker, count);
      case "files":
        return () => generateFiles(this.faker, count);
      case "socialmediaprofiles":
        return () => generateSocialMediaProfiles(this.faker, count);
      case "educationalinstitutions":
        return () => generateEducationalInstitutions(this.faker, count);
      case "financialtransactions":
        return () => generateFinancialTransactions(this.faker, count);
      case "healthrecords":
        return () => generateHealthRecords(this.faker, count);
      case "realestatelistings":
        return () => generateRealEstateListings(this.faker, count);
      case "travelplans":
        return () => generateTravelPlans(this.faker, count);
      case "recipes":
        return () => generateRecipes(this.faker, count);
      case "orders":
        return () => generateOrders(this.faker, count);
      default:
        console.error("Unsupported niche:", niche);
        return () => [];
    }
  }
}
