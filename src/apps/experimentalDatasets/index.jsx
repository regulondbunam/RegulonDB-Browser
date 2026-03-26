/*
# Component (user guide)

# ExperimentalDatasets
	
## Description  
	
Its main function is to display a list of downloadable file names and to provide download and browse functionality for these files.

## Category   
	
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team:


# Component (technical guide)

## Component Type 
Visual

## Dependencies
React: React is the core library used to build user interfaces in web applications. It allows the creation of reusable components and facilitates application state management.
exData.css: This is a style sheet (CSS) file that provides specific styles for the ExperimentalDatasets component.
Cover: Cover is a custom component that is used to display a kind of header or cover page in the user interface.
DataVerifier:It is a custom utility or component that is likely to be used to check the validity of certain data or strings.
Circular: It is a component used to display a circular load indicator.
DownloadIcon: it is an icon provided by Material-UI that is used in a button to represent the action of downloading a file.
ManageSearchIcon: it is another icon provided by Material-UI that is used on a button to represent the file browsing and filtering action.
Button: it  is a Material-UI component used to create buttons in the user interface. In this context, it is used to create download and navigation buttons.
Tooltip: it is a Material-UI component that provides pop-up information when the user hovers over an element.
Link: it is a React Router component used to create navigation links within a React application.
useParams: it is a hook provided by React Router that is used to obtain parameters from the current URL.
BrowserFilter: it is custom component used to browse and filter files.
useLazyGetDataFile: it is a custom hook used to obtain data from a file asynchronously.
gql: it  is a function provided by Apollo Client that is used to define GraphQL queries as template strings.
useQuery: it is a hook provided by Apollo Client that is used to execute GraphQL queries and manage the results.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                                                                                          |  Syntax   | Additional Notes or References | 
| --------| ---------------------------------------------------------------------------------------------------- | --------- | ------------------------------ |
|useQuery |it is a hook provided by Apollo Client that is used to execute GraphQL queries and manage the results.|useQuery();|                                |
|useParams|it is a hook provided by React Router that is used to obtain parameters from the current URL.         |useParams();|   



*/

import React from "react";
import "./exData.css";
import {
  Cover,
  DataVerifier,
  Circular,
} from "../../components/ui-components";
import DownloadIcon from "@mui/icons-material/Download";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link, useParams } from "react-router-dom";
import BrowserFilter from "./browserFilter";
import { useLazyGetDataFile } from "../../components/webservices";
import LoadingButton from "@mui/lab/LoadingButton";
import ScienceIcon from "@mui/icons-material/Science";
import EvidenceTable from "./EvidenceTable";
import { useGetListAllDownloadableFiles } from "../../regulondb-ws/queries";

/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX|HTMLElement}
 */
export default function ExperimentalDatasets() {
  const {
    fileList,
    fileGroup,
    loading: loadingListFiles,
  } = useGetListAllDownloadableFiles();
  const [getFile, { loading: loadingFileData }] = useLazyGetDataFile();
  const { idFile, tool } = useParams();

  /**
   * Description placeholder
   *
   * @param {*} file
   */
  const handleDownload = (file) => {
    switch (file.path.type) {
      case "graphQLservice":
        getFile({
          variables: { fileName: file.name },
          onCompleted: (data) => {
            //console.log(data);
            const fileData = data.getDataOfFile;
            let fileInfo = "";
            if (DataVerifier.isValidString(fileData.license)) {
              fileInfo += "# License\n#\t" + fileData.license + "\n";
            }
            if (DataVerifier.isValidString(fileData.citation)) {
              fileInfo += "# Citation\n#\t" + fileData.citation + "\n";
            }
            if (DataVerifier.isValidObject(fileData.contact)) {
              fileInfo += `# Contact\n${
                DataVerifier.isValidString(fileData.contact.personName)
                  ? "#\tperson:" + fileData.contact.personName + "\n"
                  : ""
              }${
                DataVerifier.isValidString(fileData.contact.email)
                  ? "#\temail:" + fileData.contact.email + "\n"
                  : ""
              }${
                DataVerifier.isValidString(fileData.contact.webPage)
                  ? "#\twebPage:" + fileData.contact.webPage + "\n"
                  : ""
              }`;
            }
            if (DataVerifier.isValidString(fileData.creationDate)) {
              fileInfo += "#Date:\n#\t" + fileData.creationDate + "\n";
            }
            if (DataVerifier.isValidString(fileData.columnsDetails)) {
              fileInfo +=
                "#" + fileData.columnsDetails.replaceAll("\n", "\n#") + "\n";
            }
            if (DataVerifier.isValidString(fileData.content)) {
              fileInfo += fileData.content;
            }
            const blob = new Blob([fileInfo], { type: "text/plain" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileData.fileName + ".tsv";
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            //console.log(fileInfo);
          },
        });
        break;
      default:
        break;
    }
  };

  if (loadingListFiles) {
    return (
      <div>
        <Cover>
          <h1>Loading Files...</h1>
        </Cover>
        <Circular />
      </div>
    );
  }

  if (fileList) {
    if (idFile) {
      /**
       * Description placeholder
       *
       * @type {*}
       */
      const file = fileList.find((file) => file._id === idFile);
      if (!file) {
        return <>there is no file with this name or id:{idFile}</>;
      }
      if (tool === "browser") {
        return (
          <BrowserFilter
            fileName={file.fileName}
            filePath={{
              url: "",
              type: "graphQLservice",
            }}
            file={{
              name: file.fileName,
              type: "table",
            }}
          />
        );
      }
      if (tool === "evidence") {
        return (
          <EvidenceTable
            fileName={file.fileName}
            filePath={{
              url: "",
              type: "graphQLservice",
            }}
            file={{
              name: file.fileName,
              type: "table",
            }}
          />
        );
      }
      return <>{tool + " tool error"}</>;
    }
    return (
      <div>
        <Cover>
          <h1>Downloadable Experimental Datasets</h1>
        </Cover>
        <div style={{ margin: "1% 5% 1% 5%" }}>
          <table className="tableED">
            <tbody>
              {Object.keys(fileGroup).map((group, index) => {
                const files = fileGroup[group];
                if (!DataVerifier.isValidArray(files)) {
                  return null;
                }
                return (
                  <React.Fragment key={"group_" + group + "_" + index}>
                    <tr>
                      <th style={{backgroundColor: "#72a7c7", color: "white"}} colSpan={3}>{group}</th>
                    </tr>
                    <tr>
                      <th>File</th>
                      <th>Description</th>
                      <th style={{width: "300px"}} >Options</th>
                    </tr>
                    {files.map((file, i) => {
                      if (/internal/.test(file.fileName)) {
                        return null;
                      }
                      return (
                        <tr key={"file_" + file._id + "_" + i}>
                          <td>{file.fileName}</td>
                          <td>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: file.description,
                              }}
                            />
                          </td>
                          <td>
                            <Tooltip title="Download File">
                              <LoadingButton
                                loading={loadingFileData}
                                onClick={() => {
                                  handleDownload({
                                    id: file._id,
                                    name: file.fileName,
                                    path: {
                                      url: "",
                                      type: "graphQLservice",
                                    },
                                    version: "",
                                    format: "tsv",
                                    type: "table",
                                  });
                                }}
                                variant="outlined"
                              >
                                <DownloadIcon />
                              </LoadingButton>
                            </Tooltip>
                            <Tooltip title="Browse & Filter">
                              <Link to={"/datasets/browser/" + file._id}>
                                <Button variant="outlined">
                                  <ManageSearchIcon />
                                </Button>
                              </Link>
                            </Tooltip>
                            {["TF-RISet", "RISet", "PromoterSet"].find(
                              (f) => f === file.fileName
                            ) && (
                              <Tooltip title="Confidence Level Calculator Tool">
                                <Link to={"/datasets/evidence/" + file._id}>
                                  <Button variant="outlined">
                                    <ScienceIcon />
                                  </Button>
                                </Link>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <></>;
}
