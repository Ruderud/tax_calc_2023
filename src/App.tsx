import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";

const 만 = 10000;

const App = () => {
  const [nowIncome, setNowIncome] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<[number, string, number]>([
    0,
    "금1400만이하",
    0.06,
  ]);

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowIncome(Number(event.currentTarget.value));
  };

  const calculation_2023 = (income: number): [number, string, number] => {
    let 총소득세 = 0;
    let 적용구간 = "금1400만이하";
    let 세율 = 0.06;

    const 구간 = {
      금1400만이하: 0.06,
      금5000만이하: 0.15,
      금8800만이하: 0.24,
      금1억5천이하: 0.35,
      금3억이하: 0.38,
      금5억이하: 0.4,
      금10억이하: 0.42,
      금10억초과: 0.45,
    };

    if (income * 만 <= 1400 * 만) {
      총소득세 += income * 만 * 구간.금1400만이하;
    }

    if (income * 만 > 1400 * 만 && income * 만 <= 5000 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += (income - 1400) * 만 * 구간.금5000만이하;
      (적용구간 = "금5000만이하"), (세율 = 구간.금5000만이하);
    }

    if (income * 만 > 5000 * 만 && income * 만 <= 8800 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += 3600 * 만 * 구간.금5000만이하;
      총소득세 += (income - 5000) * 만 * 구간.금8800만이하;
      (적용구간 = "금8800만이하"), (세율 = 구간.금8800만이하);
    }

    if (income * 만 > 8800 * 만 && income * 만 <= 15000 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += 3600 * 만 * 구간.금5000만이하;
      총소득세 += 3800 * 만 * 구간.금8800만이하;
      총소득세 += (income - 8800) * 만 * 구간.금1억5천이하;
      (적용구간 = "금1억5천이하"), (세율 = 구간.금1억5천이하);
    }

    if (income * 만 > 15000 * 만 && income * 만 <= 30000 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += 3600 * 만 * 구간.금5000만이하;
      총소득세 += 3800 * 만 * 구간.금8800만이하;
      총소득세 += 6200 * 만 * 구간.금1억5천이하;
      총소득세 += (income - 15000) * 만 * 구간.금3억이하;
      (적용구간 = "금3억이하"), (세율 = 구간.금3억이하);
    }

    if (income * 만 > 30000 * 만 && income * 만 <= 50000 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += 3600 * 만 * 구간.금5000만이하;
      총소득세 += 3800 * 만 * 구간.금8800만이하;
      총소득세 += 6200 * 만 * 구간.금1억5천이하;
      총소득세 += 15000 * 만 * 구간.금3억이하;
      총소득세 += (income - 30000) * 만 * 구간.금5억이하;
      (적용구간 = "금5억이하"), (세율 = 구간.금5억이하);
    }

    if (income * 만 > 50000 * 만 && income * 만 <= 100000 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += 3600 * 만 * 구간.금5000만이하;
      총소득세 += 3800 * 만 * 구간.금8800만이하;
      총소득세 += 6200 * 만 * 구간.금1억5천이하;
      총소득세 += 15000 * 만 * 구간.금3억이하;
      총소득세 += 20000 * 만 * 구간.금5억이하;
      총소득세 += (income - 50000) * 만 * 구간.금10억이하;
      (적용구간 = "금10억이하"), (세율 = 구간.금10억이하);
    }

    if (income * 만 > 100000 * 만) {
      총소득세 += 1400 * 만 * 구간.금1400만이하;
      총소득세 += 3600 * 만 * 구간.금5000만이하;
      총소득세 += 3800 * 만 * 구간.금8800만이하;
      총소득세 += 6200 * 만 * 구간.금1억5천이하;
      총소득세 += 15000 * 만 * 구간.금3억이하;
      총소득세 += 20000 * 만 * 구간.금5억이하;
      총소득세 += 50000 * 만 * 구간.금10억이하;
      총소득세 += (income - 100000) * 만 * 구간.금10억초과;
      (적용구간 = "금10억초과"), (세율 = 구간.금10억초과);
    }

    return [총소득세, 적용구간, 세율];
  };

  useEffect(() => {
    setTotalTax(calculation_2023(nowIncome));
  }, [nowIncome]);

  return (
    <AppContainer>
      <Paper
        elevation={10}
        sx={{
          width: 250,
          p: 2,
        }}
      >
        <Typography variant="h5">2023 소득세 계산기</Typography>
        <Typography variant="subtitle2">(2023.01.01 적용예정)</Typography>
      </Paper>
      <Paper elevation={10} sx={{ width: "100%" }}>
        <FormControl sx={{ m: 2 }}>
          <InputLabel htmlFor="outlined-adornment-amount">세전소득</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            value={nowIncome}
            onChange={handleIncomeChange}
            startAdornment={<InputAdornment position="start">₩</InputAdornment>}
            endAdornment={<InputAdornment position="end">만 원</InputAdornment>}
            label="세전소득"
          />
        </FormControl>
      </Paper>
      <Paper elevation={10}>
        <div>해당하는 과세표준 구간과 세율은</div>
        <div>{`${totalTax[1]}, ${totalTax[2] * 100}% 이며`}</div>
        <div>예상 소득세는 </div>
        <div>{`${totalTax[0]} 원 입니다.`}</div>
      </Paper>
    </AppContainer>
  );
};

const AppContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexFlow: "column",

  "& > * ": {
    marginBottom: theme.spacing(2),
  },
}));

export default App;
