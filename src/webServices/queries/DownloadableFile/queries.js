import { gql } from "@apollo/client";

export const query_ListAllDownloadableFiles = gql`query ListAllDownloadableFiles {
    listAllDownloadableFiles {
      _id
      citation
      columnsDetails
      contact {
        email
        person
        webPage
      }
      content
      creationDate
      description
      fileFormat
      fileName
      group
      license
      rdbVersion
      version
    }
  }`