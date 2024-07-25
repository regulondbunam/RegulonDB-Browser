
export const COMPONENTS = {
    MuiButton: {
        defaultProps: {
          sx:{
            borderRadius: "0px",
            boxShadow: "none"
          }
        },
        variants: [
          {
            props: { variant: 'text' },
            style: {
              border: "none",
              backgroundColor: "#E0EFFC"
            },
          }
        ]
    }
}

/**
 * borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
 */