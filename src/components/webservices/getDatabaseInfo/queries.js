import { gql } from "@apollo/client";

export const query_getSummaryHistoryData = gql`
  query GetDatabaseInfo {
    getDatabaseInfo {
      regulonDBVersion
      ecocycVersion
      lcVersion
      releaseDate
      note
      genomeVersion
      localData {
        type
        sourceName
        version
        note
        responsible
      }
      statistics {
        regulons {
          regulatoryContinuant {
            total
            weak
            strong
            confirmed
            withoutEvidences

            withPublications
            withEvidences
          }
          srna {
            total
            weak
            strong
            confirmed
            withoutEvidences

            withPublications
            withEvidences
          }
          transcriptionFactor {
            total
            weak
            strong
            confirmed
            withoutEvidences

            withPublications
            withEvidences
          }
        }
        operon {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        regulatoryInteractions {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        srnaInteractions {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        functConfTF {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        effectors {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        transcriptionFactors {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        regulatorBindingSites {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        promoters {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        genes {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        transcriptionUnits {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        terminators {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        shineDalgarnos {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        attenuators {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        riboswitches {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        functionalClasses {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        gensorUnits {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        synonyms {
          total
          weak
          strong
          confirmed
          withoutEvidences

          withPublications
          withEvidences
        }
        product {
          rnas {
            total
            weak
            strong
            confirmed
            withoutEvidences
            withPublications
            withEvidences
          }
          polypeptides {
            total
            weak
            strong
            confirmed
            withoutEvidences
            withPublications
            withEvidences
          }
          srna {
            total
            weak
            strong
            confirmed
            withoutEvidences
            withPublications
            withEvidences
          }
        }
      }
      route
      regulondbPMID
    }
  }
`;
