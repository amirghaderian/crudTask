import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardContent,
  FormControl,
  ListItem,
  MenuItem,
} from "@mui/material";
import { Paper, Select, TextField, Typography } from "@mui/material";
import { Card, CardActions, Collapse, styled } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from "axios";
import Rtl from "./Rtl";
import { Delete } from "@mui/icons-material";
interface Values {
  type: string;
  link: string;
  id: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface Item {
  id: number;
  name: string;
  link: string;
  type: string;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const RecipeReviewCard = () => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(true);
  };
  const handleReset = () => {
    setExpanded(false);
  };
  const handleAddRout = () => {
    setExpanded(false);
  };
  return (
    <Card sx={{ bgcolor: "inherit" }} elevation={0}>
      <CardActions disableSpacing>
        <ExpandMore
          sx={{ borderRadius: "5px" }}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <span
            style={{
              color: "rgb(198,120,85)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            + افزودن مسیر ارتباطی
          </span>
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ bgcolor: "rgb(51,61,71)", borderRadius: "6px" }}
      >
        <CardContent>
          <Typography color="white">افزودن مسیر ارتباطی</Typography>
          <Formik
            initialValues={{
              type: "",
              link: "",
              id: "",
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form>
              <br />
              <Rtl>
                <FormControl
                  variant="outlined"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Box>
                    <Field
                      labelId="label-type"
                      as={Select}
                      id="type"
                      name="type"
                      label="*نوع"
                    >
                      <MenuItem value={"instagram"}>اینستاگرام</MenuItem>
                      <MenuItem value={"web"}>وب سایت</MenuItem>
                      <MenuItem value={"facebook"}>فیسبوک</MenuItem>
                      <MenuItem value={"twitter"}>تویتر</MenuItem>
                      <MenuItem value={"telgram"}>تلگرام</MenuItem>
                    </Field>
                  </Box>

                  <Field id="link" name="link" as={TextField} label="لینک" />
                  <Field
                    id="id"
                    name="id"
                    label="آی دی(ID)"
                    placeholder="john@acme.com"
                    as={TextField}
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{ mr: "10px" }}
                    onClick={handleReset}
                  >
                    انصراف
                  </Button>
                  <Button
                    color="warning"
                    type="submit"
                    variant="contained"
                    onClick={handleAddRout}
                  >
                    افزودن مسیر ارتباطی
                  </Button>
                </Box>
              </Rtl>
            </Form>
          </Formik>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Forms = () => {
  const [data, setData] = useState<Item[]>([]);
  const api = axios.create({
    baseURL: "http://localhost:3030/",
  });
  const fetchData = async () => {
    try {
      const response = await api.get("socials");
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography sx={{ mr: "230px", px: "24px" }} component="div">
        <Paper
          sx={{
            mt: "30px",
            ml: "250px",
            minWidth: "300px",
            bgcolor: "rgb(33,42,53)",
          }}
          elevation={10}
        >
          <Typography sx={{ px: "20px" }}>
            <span>مسیر های ارتباطی</span>
          </Typography>
          <br />
          <Typography sx={{ px: "20px", mb: "40px" }} component="div">
            <RecipeReviewCard />
          </Typography>
          <Typography component="div" sx={{ pb: "30px", px: "20px" }}>
            <Paper
              elevation={0}
              sx={{
                mt: "30px",
                minWidth: "300px",
                bgcolor: "rgb(51,61,71)",
                px: "16px",
              }}
            >
              <div style={{display: "flex" ,justifyContent: "center"}} >
                <div style={{width:"100px"}}>نوع</div>
                <div  style={{width:"100px"}}>لينك</div>
                <div  style={{width:"100px"}}>آي دي</div>
              </div>
              {data.map((item) => (
                <Box sx={{ display: "flex",  }}>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    key={item.id}
                  >
                    <div style={{ width: "100px" }}> </div>
                    <div style={{ width: "100px", display: "flex" }}>
                       {item.type}
                    </div>{" "}
                    <div style={{ width: "100px", display: "flex" }}>
                     {item.name}
                    </div>
                    <div style={{ width: "100px", display: "flex" }}>
                     {item.link}
                    </div>
                    <Button sx={{ mr: "10px" }}>ويرايش</Button>
                    <Button>
                      حذف <Delete color="error" />
                    </Button>
                  </ListItem>
                </Box>
              ))}
            </Paper>
          </Typography>
        </Paper>
      </Typography>
    </>
  );
};

export default Forms;
