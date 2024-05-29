import { Faker } from "@faker-js/faker";
import {
  User,
  Post,
  Comment,
  Album,
  Review,
  Todo,
  Address,
  Company,
  Product,
  Payment,
  SocialMediaProfile,
  Vehicle,
  File,
  EducationalInstitution,
  FinancialTransaction,
  HealthRecord,
  RealEstateListing,
  TravelPlan,
  Recipe,
  Order,
  dataEntityType,
} from "../utils/types";

export function selectDataGenerator(
  faker: Faker,
  niche: dataEntityType,
  limit: number,
) {
  switch (niche.toLowerCase()) {
    case "users":
      return generateUser(faker, limit);
    case "posts":
      return generatePosts(faker, limit);
    case "comments":
      return generateComments(faker, limit);
    case "albums":
      return generateAlbums(faker, limit);
    case "reviews":
      return generateReviews(faker, limit);
    case "todos":
      return generateTodos(faker, limit);
    case "addresses":
      return generateAddresses(faker, limit);
    case "companies":
      return generateCompanies(faker, limit);
    case "products":
      return generateProducts(faker, limit);
    case "payments":
      return generatePayments(faker, limit);
    case "vehicles":
      return generateVehicles(faker, limit);
    case "files":
      return generateFiles(faker, limit);
    case "socialmediaprofiles":
      return generateSocialMediaProfiles(faker, limit);
    case "educationalinstitutions":
      return generateEducationalInstitutions(faker, limit);
    case "financialtransactions":
      return generateFinancialTransactions(faker, limit);
    case "healthrecords":
      return generateHealthRecords(faker, limit);
    case "realestatelistings":
      return generateRealEstateListings(faker, limit);
    case "travelplans":
      return generateTravelPlans(faker, limit);
    case "recipes":
      return generateRecipes(faker, limit);
    case "orders":
      return generateOrders(faker, limit);
    default:
      console.error("Unsupported niche:", niche);
      return [];
  }
}

export function generateUser(faker: Faker, count: number): User[] {
  return faker.helpers.multiple(
    () => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }),
    { count },
  );
}

export function generatePosts(faker: Faker, count: number): Post[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(5),
      content: faker.lorem.paragraph(),
      author: faker.person.fullName(),
      createdAt: faker.date.recent(),
    }),
    { count },
  );
}

export function generateComments(faker: Faker, count: number): Comment[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      postId: faker.string.uuid(),
      author: faker.person.fullName(),
      content: faker.lorem.sentences(2),
      createdAt: faker.date.recent(),
    }),
    { count },
  );
}

export function generateAlbums(faker: Faker, count: number): Album[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      title: faker.music.genre(),
      artist: faker.person.fullName(),
      releaseYear: faker.date.past().getFullYear(),
      tracks: Array.from(
        { length: faker.number.int({ min: 5, max: 10 }) },
        (_, i) => `${faker.lorem.word()} Track ${i + 1}`,
      ),
    }),
    { count },
  );
}

export function generateReviews(faker: Faker, count: number): Review[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      productId: faker.string.uuid(),
      reviewer: faker.person.fullName(),
      rating: faker.number.int({ min: 1, max: 5 }),
      review: faker.lorem.sentences(2),
      createdAt: faker.date.recent(),
    }),
    { count },
  );
}

export function generateTodos(faker: Faker, count: number): Todo[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(5),
      description: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.future(),
    }),
    { count },
  );
}

export function generateAddresses(faker: Faker, count: number): Address[] {
  return faker.helpers.multiple(
    () => ({
      street: faker.location.street(),
      suite: faker.location.secondaryAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    }),
    { count },
  );
}

export function generateCompanies(faker: Faker, count: number): Company[] {
  return faker.helpers.multiple(
    () => ({
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase(),
    }),
    { count },
  );
}

export function generateProducts(faker: Faker, count: number): Product[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
    }),
    { count },
  );
}

export function generatePayments(faker: Faker, count: number): Payment[] {
  return faker.helpers.multiple(
    () => ({
      cardNumber: faker.finance.creditCardNumber(),
      cardType: faker.finance.creditCardIssuer(),
      transactionId: faker.string.uuid(),
      transactionDescription: faker.finance.transactionDescription(),
      amount: faker.finance.amount(),
    }),
    { count },
  );
}

export function generateVehicles(faker: Faker, count: number): Vehicle[] {
  return faker.helpers.multiple(
    () => ({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.number.int({ min: 1900, max: new Date().getFullYear() }),
    }),
    { count },
  );
}

export function generateFiles(faker: Faker, count: number): File[] {
  return faker.helpers.multiple(
    () => ({
      fileName: faker.system.fileName(),
      fileType: faker.system.commonFileExt(),
      mimeType: faker.system.mimeType(),
    }),
    { count },
  );
}

export function generateSocialMediaProfiles(
  faker: Faker,
  count: number,
): SocialMediaProfile[] {
  return faker.helpers.multiple(
    () => ({
      username: faker.internet.userName(),
      bio: faker.lorem.sentences(3),
      followersCount: faker.number.int({ min: 0, max: 10000 }),
    }),
    { count },
  );
}

export function generateEducationalInstitutions(
  faker: Faker,
  count: number,
): EducationalInstitution[] {
  return faker.helpers.multiple(
    () => ({
      name: faker.company.name(),
      address: generateAddresses(faker, 1)[0],
      established: faker.date.past().getFullYear(),
      motto: faker.company.catchPhrase(),
      departments: faker.helpers.arrayElements(
        ["Computer Science", "Business", "Engineering"],
        3,
      ),
    }),
    { count },
  );
}

export function generateFinancialTransactions(
  faker: Faker,
  count: number,
): FinancialTransaction[] {
  return faker.helpers.multiple(
    () => ({
      date: faker.date.past(),
      amount: faker.finance.amount(),
      currency: faker.finance.currency().symbol,
      type: faker.helpers.arrayElement(["deposit", "withdrawal", "transfer"]),
    }),
    { count },
  );
}

export function generateHealthRecords(
  faker: Faker,
  count: number,
): HealthRecord[] {
  const diagnoses = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Cancer",
    "Heart Disease",
  ];
  const treatments = [
    "Medication",
    "Physical Therapy",
    "Surgery",
    "Dietary Changes",
    "Exercise",
  ];
  return faker.helpers.multiple(
    () => ({
      patientId: faker.string.uuid(),
      diagnosis: faker.helpers.arrayElement(diagnoses),
      treatment: faker.helpers.arrayElement(treatments),
      appointmentDate: faker.date.future(),
    }),
    { count },
  );
}

export function generateRealEstateListings(
  faker: Faker,
  count: number,
): RealEstateListing[] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      address: generateAddresses(faker, 1)[0],
      price: faker.finance.amount(),
      bedrooms: faker.number.int({ min: 1, max: 5 }),
      bathrooms: faker.number.int({ min: 1, max: 4 }),
      squareFeet: faker.number.int({ min: 500, max: 5000 }),
    }),
    { count },
  );
}

export function generateTravelPlans(faker: Faker, count: number): TravelPlan[] {
  return faker.helpers.multiple(
    () => ({
      destination: faker.location.country(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      accommodation: faker.company.name(),
    }),
    { count },
  );
}

export function generateRecipes(faker: Faker, count: number): Recipe[] {
  const foodIngredients = [
    "Apple",
    "Banana",
    "Carrot",
    "Dates",
    "Eggplant",
    "Fig",
    "Grape",
    "Honeydew Melon",
    "Iceberg Lettuce",
    "Jackfruit",
  ];
  return faker.helpers.multiple(
    () => ({
      title: faker.lorem.words(3),
      ingredients: Array.from(
        { length: faker.number.int({ min: 5, max: 10 }) },
        () => faker.helpers.arrayElement(foodIngredients),
      ),
      instructions: faker.lorem.paragraphs(3),
      prepTime: `${faker.number.int({ min: 0, max: 23 })}:${faker.number.int({ min: 0, max: 59 }).toString().padStart(2, "0")}:${faker.number.int({ min: 0, max: 59 }).toString().padStart(2, "0")}`,
    }),
    { count },
  );
}

export function generateOrders(faker: Faker, count: number): Order[] {
  return faker.helpers.multiple(
    () => ({
      orderId: faker.string.uuid(),
      customerId: faker.string.uuid(),
      products: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => ({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          category: faker.commerce.department(),
        }),
      ),
      status: faker.helpers.arrayElement(["pending", "shipped", "delivered"]),
      totalAmount: faker.finance.amount(),
    }),
    { count },
  );
}
