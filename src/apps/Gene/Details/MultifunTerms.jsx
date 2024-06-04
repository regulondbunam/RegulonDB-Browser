import { Typography } from "@mui/material";
/**
 * Description placeholder
 *
 * @export
 * @param {{ multifunTerms?: {}; }} { multifunTerms=[] }
 * @returns {React.JSX}
 */
export default function MultifunTerms({ multifunTerms=[] }) {
    return (
        <div style={{margin: "10px"}} >
            {multifunTerms.map((m, i) => {
                return (
                    <div key={`multifun${i}-data-${m.id}`}>
                        <Typography variant="relevant" >{`${m.label}: ${m.name}`}</Typography>
                    </div>
                );
            })}
        </div>
    );
}