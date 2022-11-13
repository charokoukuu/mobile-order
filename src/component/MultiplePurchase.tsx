import styled from "@emotion/styled"
import { Fab } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
interface Props {
    purchaseCount: number;
    setPurchaseCount: (quantity: number) => void;
    initalValue?: number;
}

export const MultiplePurchase = ({ purchaseCount, setPurchaseCount, initalValue }: Props) => {
    return (
        <Wrapper>
            {!initalValue && <Fab size="small" onClick={() => {
                if (purchaseCount > 1) {
                    setPurchaseCount(purchaseCount - 1)

                }
            }} style={{
                backgroundColor: purchaseCount > 1 ? "#1D98F2" : "#707070",
                boxShadow: "none"
            }}><RemoveIcon style={{ color: "white" }} /></Fab>}
            <Quantity className="japanese_L">{purchaseCount}個</Quantity>

            {!initalValue && <Fab size={"small"} onClick={() => {
                setPurchaseCount(purchaseCount + 1)
            }} style={{
                backgroundColor: "#F25F1D",
                boxShadow: "none"
            }}><AddIcon style={{ color: "white" }} /></Fab>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    overflow-x: scroll;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    width: 95%;
    margin: 0 auto;
    height: 70px;
    background-color: #fff;
`

const Quantity = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #707070;
    margin: 0px 20px 0px 20px;
    padding: 0px 50px;
`