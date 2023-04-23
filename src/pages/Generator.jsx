import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Appdrawer from "../components/Appdrawer";
import { Button, Container, makeStyles } from "@material-ui/core";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router";
import { CloudDownloadTwoTone } from "@material-ui/icons";
// import e from "express";

const useStyles = makeStyles((theme) => {
  return {
    generator: {
      display: "flex",
      justifyContent: "space-between",
    },
    btn: {
      width: "fit-content",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
      marginTop: "2rem",
    },
  };
});
function Generator() {
  const data = {
    clean:
      "# Cells\n\nCells are the basic unit of life. Living organisms are made up of one or more cells. Cells carry out various functions that enable the growth, development, and survival of living things. \n\nThere are two main types of cells: prokaryotic and eukaryotic cells.\n\n## Prokaryotic Cells\n\nProkaryotic cells are small and lack a nucleus. They are found in organisms such as bacteria and archaea. Prokaryotic cells contain DNA, ribosomes, cell membranes, and cytoplasm. However, they do not contain membrane-bound organelles, such as mitochondria or chloroplasts.\n\n[img:15]\n\n## Eukaryotic Cells\n\nEukaryotic cells are larger and have a nucleus containing DNA. They are found in protists, fungi, plants, and animals. Eukaryotic cells have membrane-bound organelles such as mitochondria, chloroplasts (in plant cells), the Golgi apparatus, the endoplasmic reticulum, and lysosomes. Eukaryotic cells are more complex in structure and function compared to prokaryotic cells.\n\n[img:16]\n\n## Cell Membrane\n\nCell membrane is the outermost part of the cell. It protects the cell from the external environment and regulates the movement of substances in and out of the cell. The cell membrane is a selectively permeable membrane, meaning it allows only certain molecules to enter and exit the cell.\n\n[img:17]\n\nUnderstanding cells is essential to understanding life processes.",
    created_at: "2023-04-20T11:40:46.816459",
    creator_id: 1,
    curriculum: "Nigeria",
    id: 3,
    images: [
      {
        created_at: "2023-04-20T11:41:09.389638",
        id: 15,
        prompt: "a micrograph of prokaryotic cells, magnified x100",
        updated_at: "2023-04-20T11:41:09.389638",
        url: "https://dhfspace.fra1.digitaloceanspaces.com/dhfspace/d1m9ta9h0h.png",
      },
      {
        created_at: "2023-04-20T11:41:15.522510",
        id: 16,
        prompt: "an illustration of a eukaryotic cell, labeled with its parts",
        updated_at: "2023-04-20T11:41:15.522510",
        url: "https://dhfspace.fra1.digitaloceanspaces.com/dhfspace/z3f6rs99ek.png",
      },
      {
        created_at: "2023-04-20T11:41:21.430720",
        id: 17,
        prompt:
          "an image of a cell membrane, showing its components and function",
        updated_at: "2023-04-20T11:41:21.430720",
        url: "https://dhfspace.fra1.digitaloceanspaces.com/dhfspace/ma2uowaize.png",
      },
    ],
    level: "SS2",
    raw: "# Cells\n\nCells are the basic unit of life. Living organisms are made up of one or more cells. Cells carry out various functions that enable the growth, development, and survival of living things. \n\nThere are two main types of cells: prokaryotic and eukaryotic cells.\n\n## Prokaryotic Cells\n\nProkaryotic cells are small and lack a nucleus. They are found in organisms such as bacteria and archaea. Prokaryotic cells contain DNA, ribosomes, cell membranes, and cytoplasm. However, they do not contain membrane-bound organelles, such as mitochondria or chloroplasts.\n\n[image: a micrograph of prokaryotic cells, magnified x100]\n\n## Eukaryotic Cells\n\nEukaryotic cells are larger and have a nucleus containing DNA. They are found in protists, fungi, plants, and animals. Eukaryotic cells have membrane-bound organelles such as mitochondria, chloroplasts (in plant cells), the Golgi apparatus, the endoplasmic reticulum, and lysosomes. Eukaryotic cells are more complex in structure and function compared to prokaryotic cells.\n\n[image: an illustration of a eukaryotic cell, labeled with its parts]\n\n## Cell Membrane\n\nCell membrane is the outermost part of the cell. It protects the cell from the external environment and regulates the movement of substances in and out of the cell. The cell membrane is a selectively permeable membrane, meaning it allows only certain molecules to enter and exit the cell.\n\n[image: an image of a cell membrane, showing its components and function]\n\nUnderstanding cells is essential to understanding life processes.",
    subject: "Biology",
    topic: "Cells",
    updated_at: "2023-04-20T11:41:27.154617",
  };

  const classes = useStyles();
  const pdfRef = React.useRef();
  const [markdown, setMarkdown] = useState(data.clean);
  const { id } = useParams();
  const [appDrawer, setAppDrawer] = useState(true);
  const [content, setContent] = useState("");
  const [markdownText, setMarkdownText] = useState("");
  const [printbtn, setPrintbtn] = useState(true);

  useEffect(() => {
    setContent(
      JSON.parse(localStorage.getItem("subject")).find((item) => item.id == id)
    );
    setMarkdownText(content.clean);
    console.log(content);
    console.log(markdownText);
  }, [id]);

  useEffect(() => {
    let formatted = content.clean;
    console.log(content.images);
    content?.images?.map((image) => {
      formatted = formatted?.replace(
        `[img:${image.id}]`,
        `![${image.prompt}](${image.url})`
      );
      setMarkdownText(formatted);
    });
  }, [content]);
  console.log(markdownText);
  const handlePrint = () => {
    window.print();
    setPrintbtn(!printbtn);
  };
  return (
    <div className={classes.generator} ref={pdfRef}>
      {appDrawer && <Appdrawer />}
      <Container className="markdownContainer">
        <Button
          startIcon={<CloudDownloadTwoTone style={{ color: "white" }} />}
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={handlePrint}
        >
          Export Note
        </Button>
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </Container>
    </div>
  );
}

export default Generator;
