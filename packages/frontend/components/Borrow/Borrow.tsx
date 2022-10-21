import { useState } from "react"
import {
  Divider,
  Button,
  Typography,
  CardContent,
  Card,
  Grid,
  CircularProgress,
  Collapse,
  useTheme,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Image from "next/image"

import { useStore } from "../../store"
import styles from "../../styles/components/Borrow.module.css"
import TransactionProcessingModal from "./TransactionProcessingModal"
import { ChainSelect } from "./ChainSelect"
import TokenSelect from "./TokenSelect"

export default function Borrow() {
  const { palette } = useTheme()

  const address = useStore((state) => state.address)
  const login = useStore((state) => state.login)

  const collateral = useStore((state) => state.collateral)
  const borrow = useStore((state) => state.borrow)
  const changeBorrowChain = useStore((state) => state.changeBorrowChain)
  const changeCollateralChain = useStore((state) => state.changeCollateralChain)

  const [showTransactionDetails, setShowTransactionDetails] = useState(false)

  const {
    transactionStatus,
    setTransactionStatus,
    setShowTransactionAbstract,
  } = useStore((state) => ({
    transactionStatus: state.transactionStatus,
    setTransactionStatus: state.setTransactionStatus,
    setShowTransactionAbstract: state.setShowTransactionAbstract,
  }))

  const [showTransactionProcessingModal, setShowTransactionProcessingModal] =
    useState(false)

  const error = !address && "mustLogin"

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "0.5rem 0",
        }}
      >
        <CardContent>
          <Typography variant="body2">Borrow</Typography>

          <Divider sx={{ mt: "1rem", mb: "0.5rem" }} />

          <ChainSelect
            label="Collateral from"
            value={collateral.chainId}
            onChange={(chainId) => changeCollateralChain(chainId, address)}
          />
          <TokenSelect type="collateral" />

          {collateral.value > collateral.balance && (
            <Typography
              display="block"
              variant="small"
              mt=".5rem"
              color={palette.error.dark}
            >
              Insufficient balance
            </Typography>
          )}

          <br />

          <ChainSelect
            label="Borrow to"
            value={borrow.chainId}
            onChange={(chainId) => changeBorrowChain(chainId, address)}
          />
          <TokenSelect type="borrow" />

          <br />

          <Card
            variant="outlined"
            sx={{ cursor: "pointer", border: "none" }}
            onClick={() => setShowTransactionDetails(!showTransactionDetails)}
          >
            <div className={styles.cardLine} style={{ height: 0 }}>
              <Typography variant="small">Estimated Cost</Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="small">~$3.90</Typography>
                {showTransactionDetails ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>
            </div>
            <Collapse in={showTransactionDetails} sx={{ width: "100%" }}>
              <div
                className={styles.cardLine}
                style={{ width: "92%", marginTop: "1rem" }}
              >
                <Typography variant="small">Gas fees</Typography>
                <Typography variant="small">~$1.90</Typography>
              </div>
              <br />
              <div className={styles.cardLine} style={{ width: "92%" }}>
                <Typography variant="small">Bridges fees</Typography>
                <Typography variant="small">~$2.00</Typography>
              </div>
              <br />
              <div className={styles.cardLine} style={{ width: "92%" }}>
                <Typography variant="small">Est. processing time</Typography>
                <Typography variant="small">~2 Minutes</Typography>
              </div>
              <br />
              <div className={styles.cardLine} style={{ width: "92%" }}>
                <Typography variant="small">Route</Typography>
                <Typography variant="small">
                  <u>{"ETH > Polygon"}</u>
                </Typography>
              </div>
            </Collapse>
          </Card>
          <br />

          {error === "mustLogin" && (
            <Button
              variant="gradient"
              onClick={() => login()}
              fullWidth
              data-cy="borrow-login"
            >
              Connect wallet
            </Button>
          )}

          {!error && (
            <>
              <Button
                variant="primary"
                disabled={
                  collateral.value <= 0 ||
                  collateral.value > collateral.balance ||
                  collateral.balance <= 0
                }
                onClick={() => alert("not implemented")}
                fullWidth
              >
                Sign
              </Button>

              <br />
              <br />

              <Button
                variant="gradient"
                onClick={() => {
                  setTransactionStatus(true)
                  setShowTransactionProcessingModal(true)
                }}
                fullWidth
                className={styles.btn}
                startIcon={
                  transactionStatus ? <CircularProgress size={15} /> : undefined
                }
                disabled={
                  collateral.value <= 0 ||
                  collateral.value > collateral.balance ||
                  collateral.balance < 0
                }
              >
                Borrow
              </Button>
            </>
          )}

          <br />
          <br />

          <Grid container justifyContent="center">
            <Typography variant="small">
              Powered by
              <a
                href="https://www.connext.network/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/logo/connext-title.svg"
                  height={16}
                  width={95}
                  alt="Connext logo"
                />
              </a>
            </Typography>
          </Grid>
        </CardContent>
      </Card>
      <TransactionProcessingModal
        open={showTransactionProcessingModal}
        handleClose={() => {
          setShowTransactionProcessingModal(false)
          setShowTransactionAbstract(true)
        }}
      />
    </>
  )
}
