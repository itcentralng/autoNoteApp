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
  // const handlePrint = () => {
  //   window.print();
  //   setPrintbtn(!printbtn);
  // };

  const handleDownload = () => {
    setAppDrawer(false);
    const input = pdfRef.current;
    const options = {
      margin: 1,
      width: 1,
      filename: "my_document.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf()
      .from(input)
      .set(options)
      .save()
      .then(() => {
        setAppDrawer(true);
      });
  };

  return (
    <div className={classes.generator}>
      {appDrawer && <Appdrawer />}
      <Container className="markdownContainer" ref={pdfRef}>
        <Button
          startIcon={<CloudDownloadTwoTone style={{ color: "white" }} />}
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={handleDownload}
        >
          Export Note
        </Button>
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </Container>
    </div>
  );
}

export default Generator;
