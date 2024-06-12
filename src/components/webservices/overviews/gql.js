import {gql} from '@apollo/client'

export const query_GET_ALL_OVERVIEWS = gql`
query GET_ALL_OVERVIEWS{
    getAllObjectInfo{
      _id
      queryName
      objectType
      graph{
        title
      }
    }
  }
`
export const query_GET_OVERVIEW = gql`
query GET_OVERVIEW($id: String){
  getOverview(_id:$id){
    _id
    queryName
    objectType
    graph{
      title
      description
      labelX
      labelY
      footGraph
      graphType
    }
    data{
      xAxis
      yAxis
      objectsRelated{
        _id
        name
        type
      }
    }

  }
}`