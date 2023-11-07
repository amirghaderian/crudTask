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
import {
  Web,
  Instagram,
  Facebook,
  Twitter,
  Telegram,
  LinkedIn,
} from "@mui/icons-material";

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

const api = axios.create({
  baseURL: "http://localhost:3030/",
});

export const RecipeReviewCard = ({
  fetch,
  isEditing,
  setIsEditing,
  formData,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(true);
  };
  const handleReset = () => {
    setExpanded(false);
    setIsEditing(false);
  };
  const handleAddRout = async (values: Values) => {
    setExpanded(false);
    if (values.type && values.id && values.link) {
      try {
        await api.post("socials", {
          type: values.type,
          link: values.link,
          id: values.id,
        });
        fetch();
      } catch (error) {
        console.error("Error adding route:", error);
      }
    }
  };
  const handleUpdate = async (value) => {
    console.log(value.id);

    try {
      await api.post(`socials`, {
        type: formData.type,
        link: formData.link,
        id: formData.id,
      });
    } catch (error) {
      console.error("Error updating route:", error);
    }
    fetch();
    setIsEditing(false);
  };

  const handleBTN = (formData) =>
    isEditing ? handleUpdate(formData) : handleAddRout;
  useEffect(() => {
    if (isEditing) {
      setExpanded(true);
    }
  }, [isEditing]);
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
            + {isEditing ? "ويرايش" : "افزودن"} مسیر ارتباطی
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
          <Typography color="white">
            {isEditing ? "ويرايش" : "افزودن"} مسیر ارتباطی
          </Typography>
          <Formik
            initialValues={
              isEditing ? formData : { type: "", link: "", id: "" }
            }
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              handleAddRout(values);
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
                      <MenuItem value={"اینستاگرام"}>اینستاگرام</MenuItem>
                      <MenuItem value={"وب سایت"}>وب سایت</MenuItem>
                      <MenuItem value={"فیسبوک"}>فیسبوک</MenuItem>
                      <MenuItem value={"تویتر"}>تویتر</MenuItem>
                      <MenuItem value={"تلگرام"}>تلگرام</MenuItem>
                      <MenuItem value={"لينكداين"}>لينكداين</MenuItem>
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
                    onClick={() => handleBTN(formData)}
                  >
                    {isEditing ? "ويرايش" : "افزودن"}{" "}
                    <span> مسیر ارتباطی </span>
                    {isEditing && formData.type}
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
const AddType = ({ type }: string) => {
  if (type === "وب سایت") {
    return <Web />;
  } else if (type === "اینستاگرام") {
    return <Instagram />;
  } else if (type === "فیسبوک") {
    return <Facebook />;
  } else if (type === "تویتر") {
    return <Twitter />;
  } else if (type === "تلگرام") {
    return <Telegram />;
  } else if (type === "لینکداین") {
    return <LinkedIn />;
  }
};
const Forms = () => {
  const [data, setData] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Values>({
    type: "",
    link: "",
    id: "",
  });

  const fetchData = async () => {
    try {
      const response = await api.get("socials");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete("socials/" + `${id}`);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };
  const handleEdit = (value) => {
    console.log(value.link);
    setFormData({ type: value.type, link: value.link, id: value.id });
    setIsEditing(true);
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
            <RecipeReviewCard
              fetch={fetchData}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              formData={formData}
            />
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
              {data.map((item) => (
                <Box sx={{ display: "flex" }}key={item.id}>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    
                  >
                    <div style={{ width: "100px" }}> </div>
                    <div style={{ width: "100px", display: "flex" }}>
                      <AddType type={item.type} />
                      {item.type}
                    </div>{" "}
                    <div style={{ width: "100px", display: "flex" }}>
                      آی دی(ID){item.id}
                    </div>
                    <div style={{ width: "100px", display: "flex" }}>
                      لینک {item.link}
                    </div>
                    <Button
                      sx={{ mr: "10px" }}
                      onClick={() => handleEdit(item)}
                    >
                      ويرايش
                    </Button>
                    <Button onClick={() => handleDelete(item.id)}>
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
