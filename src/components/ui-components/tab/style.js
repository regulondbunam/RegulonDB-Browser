import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";


/**
 * Hexadecimal color
 *
 * @type {"#f4f5f5"}
 */
const backgroundColor = "#f4f5f5";
/**
 * Hexadecimal color
 *
 * @type {"#f4f5f5"}
 */
const lineColor = "#32617D";


/**
 * Description placeholder
 *
 * @type {{ WebkitBoxShadow: string; MozBoxShadow: string; boxShadow: string; backgroundColor: "#f4f5f5"; }}
 */
const headerStyle = {
    WebkitBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
    MozBoxShadow: "inset -1px -10px 0px -6px " + lineColor,
    boxShadow: "inset -1px -10px 0px -6px " + lineColor,
    backgroundColor: backgroundColor,
};


/**
 * Description placeholder
 *
 * @type {*}
 */
const StyledTabs = styled(
    
    /**
     * Description placeholder
     *
     * @param {*} props
     * @returns {*}
     */
    (props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "#32617d",
    },
});


/**
 * Description placeholder
 *
 * @type {*}
 */
const StyledTab = styled(
    
    /**
     * Description placeholder
     *
     * @param {*} props
     * @returns {*}
     */
    (props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: "none",
        height: "30px",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(12),
        marginRight: theme.spacing(1),
        backgroundColor: "#fff",
        borderTop: "1px solid #666666",
        borderRight: "1px solid #666666",
        borderLeft: "1px solid #666666",
        color: "#373737",
        "&.Mui-selected": {
            color: "#3D779B",
            fontWeight: "bold",
            borderTop: "3px solid " + lineColor,
            borderRight: "2px solid " + lineColor,
            borderLeft: "2px solid " + lineColor,
        },
        "&.Mui-focusVisible": {
            backgroundColor: "#fff",
        },
    })
);

export {StyledTabs, StyledTab, headerStyle}