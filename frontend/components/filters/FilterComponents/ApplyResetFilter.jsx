import { Box } from "@mui/material";
import Button from '@mui/material/Button';



export default function ApplyResetFilter({ handleUpdate, handleReset, handleCloseUserMenu }) {
    return (
        <Box sx={{
            display: 'flex',
        }}>
            <Button sx={{
                fontFamily: 'inter',
                fontWeight: 700,
                color: 'black',
                textTransform: 'capitalize',
                height: '75%'

            }} className="text-white bg-res_blue hover:bg-transparent hover:text-res_blue"
                onClick={() => {
                    handleUpdate();
                    handleCloseUserMenu();
                }}
            >
                Apply
            </Button>

            <Button sx={{

                color: 'black',
                fontFamily: 'inter',
                fontWeight: 500,
                display: 'block',
                textTransform: 'capitalize',
                
            }}
                className="hover:bg-transparent hover:text-res_blue"
                onClick={() => {
                    handleReset();
                    handleCloseUserMenu();
                }}>
                Reset
            </Button>
        </Box>
    )
}