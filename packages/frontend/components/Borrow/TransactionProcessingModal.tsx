import { MouseEvent, useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTheme, styled } from "@mui/material/styles"
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector"
import CloseIcon from "@mui/icons-material/Close"
import LaunchIcon from "@mui/icons-material/Launch"
import CheckIcon from "@mui/icons-material/Check"
import Image from "next/image"

import NetworkIcon from "../NetworkIcon"
import { useHistory } from "../../store/history.store"
import { RoutingStep } from "@x-fuji/sdk"
import { formatUnits } from "ethers/lib/utils"
import { chainName } from "../../helpers/chainName"
import { transactionLink } from "../../helpers/transactionLink"

type InvalidStep = {
  label: "Invalid"
}
type ValidStep = {
  label: string
  description: string
  chainId: number
  txHash?: string
  link?: string
  icon: () => JSX.Element
}
type TransactionStep = InvalidStep | ValidStep

type TransactionProcessingModalProps = {
  hash?: string
  handleClose: (e: MouseEvent) => void
}
export default function TransactionProcessingModal({
  hash,
  handleClose,
}: TransactionProcessingModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [activeStep] = useState(2)
  const entry = useHistory((state) => state.byHash[hash || ""])

  const chainId = entry?.position.vault?.chainId
  const networkName = chainId ? chainName(chainId) : ""

  if (!entry) {
    return <></>
  }

  const steps = entry.steps
    .map((s): TransactionStep => {
      const token = s.token
      const amount = formatUnits(s.amount, token.decimals)
      const provider = s.lendingProvider?.name
      const chain = chainName(s.chainId)
      const link = s.txHash && transactionLink(s.chainId, s.txHash)
      const { txHash, chainId } = s

      const style = {
        background: theme.palette.secondary.light,
        mr: "0.5rem",
        p: "0.5rem 0.5rem 0.3rem 0.5rem",
        borderRadius: "100%",
      }

      switch (s.step) {
        case RoutingStep.DEPOSIT:
          return {
            label: `Deposit ${amount} ${token.symbol} on ${provider}`,
            description: `${chain} Network`,
            chainId,
            txHash,
            link,
            icon: () => (
              <Box sx={style}>
                <NetworkIcon network={chain} height={32} width={32} />
              </Box>
            ),
          }
        case RoutingStep.BORROW:
          return {
            label: `Borrow ${amount} ${token.symbol} from ${provider}`,
            description: `${chain} Network`,
            chainId,
            txHash,
            link,
            icon: () => (
              <Box sx={style}>
                <NetworkIcon network={chain} height={32} width={32} />
              </Box>
            ),
          }
        case RoutingStep.X_TRANSFER:
          return {
            label: `Bridging ${amount} ${token.symbol} to ${chain}`,
            description: "Connext bridge",
            chainId,
            txHash,
            link,
            icon: () => (
              <Box sx={style}>
                <Image
                  src={`/assets/images/logo/Connext.svg`}
                  height={32}
                  width={32}
                  alt="Connext"
                />
              </Box>
            ),
          }
        default:
          return { label: "Invalid" }
      }
    })
    .filter((s) => s.label !== "Invalid") as ValidStep[]

  // Commented till we use it cause it make the linter fail
  // const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  // const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // const handleReset = () => setActiveStep(0)

  return (
    <Dialog
      open={Boolean(hash)}
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": { width: isMobile ? "100%" : "430px" },
        backdropFilter: { xs: "blur(0.313rem)", sm: "none" },
      }}
    >
      <Paper variant="outlined" sx={{ p: { xs: "1rem", sm: "1.5rem" } }}>
        <CloseIcon
          sx={{ cursor: "pointer", float: "right" }}
          onClick={handleClose}
          fontSize="small"
        />
        <Box textAlign="center" mt="1.625rem" mb="2.5rem">
          <Typography variant="h6">
            Transaction {entry.status === "ongoing" && "processing..."}
            {entry.status === "done" && "success"}
          </Typography>
          <Typography variant="body">Borrowing on {networkName}</Typography>
        </Box>
        <DialogContent>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            connector={<CustomConnector />}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <Grid
                  container
                  justifyContent="space-between"
                  wrap="nowrap"
                  alignItems="center"
                >
                  <Grid item>
                    <StepLabel StepIconComponent={step.icon}>
                      <Typography variant="body">{step.label}</Typography>
                      <br />
                      {step.txHash && (
                        <a href={step.link} target="_blank" rel="noreferrer">
                          <Typography variant="smallDark">
                            {step.description}
                          </Typography>
                          <LaunchIcon
                            sx={{
                              ml: "0.3rem",
                              fontSize: "0.6rem",
                              color: theme.palette.info.dark,
                            }}
                          />
                        </a>
                      )}
                    </StepLabel>
                  </Grid>
                  <Grid item>
                    {step.txHash || entry.status === "done" ? (
                      <CheckIcon
                        sx={{
                          backgroundColor: theme.palette.success.dark,
                          borderRadius: "100%",
                          padding: "0.4rem",
                        }}
                        fontSize="large"
                      />
                    ) : (
                      <CircularProgress size={32} />
                    )}
                  </Grid>
                </Grid>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        {entry.status === "ongoing" && (
          <Card variant="outlined" sx={{ mt: 3, maxWidth: "100%" }}>
            <Typography variant="small" textAlign="center">
              This step takes a few minutes to process. If you close this
              window, your transaction will still be processed.
            </Typography>
          </Card>
        )}
        {entry.status === "done" && (
          <DialogActions sx={{ mt: 3 }}>
            <Button fullWidth variant="secondary">
              Add USDC
            </Button>
            <Button fullWidth variant="gradient">
              View Position
            </Button>
          </DialogActions>
        )}
        {/* TODO: in case of error ??? */}
      </Paper>
    </Dialog>
  )
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    borderLeft: `0.125rem solid ${theme.palette.secondary.light}`,
    margin: "-0.5rem 0.7rem",
    height: "3rem",
    position: "relative",
  },
}))
