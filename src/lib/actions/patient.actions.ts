"use server";
import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const document = await users.list([Query.equal("email", [user.email])]);
      return document?.users[0];
    } else {
      console.error(error);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log(patient);

  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        process.env.PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }
    const newPatient = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
        identificationDocumentId: file?.$id,
        identificationDocumentUrl: `${process.env
          .PUBLIC_ENDPOINT!}/storage/buckets/${process.env
          .PUBLIC_BUCKET_ID!}/files/${file?.$id}/view?project=${process.env
          .PROJECT_ID!}`,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.error(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.error(error);
  }
};
