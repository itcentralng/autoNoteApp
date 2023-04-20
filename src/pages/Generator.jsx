import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Appdrawer from "../components/Appdrawer";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    generator: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});
function Generator() {
  const data = {
    clean:
      "# Deforestation in Nigeria\n\nDeforestation is the act of clearing a forest, specifically, cutting down trees for farming, urbanization, or commercial purposes. Nigeria, like many countries in Africa, is experiencing the impacts of deforestation. The country's rapidly growing population has pushed agriculture and land development, leading to the clearing of large areas of forest land.\n\n## Causes of Deforestation\n\nThe following are some of the causes of deforestation in Nigeria:\n\n- Agriculture: Agriculture is one of the leading causes of deforestation in Nigeria. As the population grows, there is increased demand for food. This has led to the expansion of agricultural lands, which requires clearing of forests.\n\n- Logging: Logging for the production of timber is another significant cause of deforestation in Nigeria. The demand for wood for construction and furniture has led to the depletion of forest reserves.\n\n- Urbanization: Nigeria's rapidly growing cities have put pressure on forested lands. The need for urban infrastructure and the expansion of cities have led to the clearing of forests.\n\n## Impacts of Deforestation\n\nDeforestation has had several impacts on Nigeria, including:\n\n- Climate change: Deforestation contributes to climate change, which has had adverse effects on Nigeria. The country has experienced more frequent droughts, flooding, and desertification.\n\n- Loss of biodiversity: Nigeria's forests are home to a variety of plant and animal species. Deforestation has led to the loss of habitats and the extinction of some species.\n\n- Soil erosion: Trees help to hold the soil in place, prevent erosion, and regulate water cycle. Deforestation has led to soil erosion, which has affected the fertility of the soil and agricultural production.\n\n## Solutions to Deforestation\n\nThe following are some of the solutions to deforestation in Nigeria:\n\n- Afforestation: Afforestation involves planting new trees in areas that have been cleared. This will help to restore the forest cover and mitigate the effects of deforestation.\n\n- Conservation: The conservation of forest reserves and parks will help to protect the forests in Nigeria. The government should enact laws to protect these areas from logging and other destructive activities.\n\n- Sustainable agriculture: The promotion of sustainable agriculture practices such as crop rotation and agroforestry will help to reduce the need for the expansion of agricultural lands.\n\n![img:18](https://cdn.pixabay.com/photo/2017/09/13/02/52/forest-2749380_960_720.jpg)\n\nIn conclusion, deforestation in Nigeria is a significant problem that requires urgent attention. The government, private sector, and individuals should work together to combat this problem and preserve Nigeria's natural resources for future generations.",
    created_at: "2023-04-20T12:07:53.142354",
    creator_id: 1,
    curriculum: "Nigeria",
    id: 4,
    images: [
      {
        created_at: "2023-04-20T12:08:27.464257",
        id: 18,
        prompt: "a dense forest with tall trees and greenery",
        updated_at: "2023-04-20T12:08:27.464257",
        url: "https://dhfspace.fra1.digitaloceanspaces.com/dhfspace/yla1pc6su5.png",
      },
    ],
    level: "SS2",
    raw: "# Deforestation in Nigeria\n\nDeforestation is the act of clearing a forest, specifically, cutting down trees for farming, urbanization, or commercial purposes. Nigeria, like many countries in Africa, is experiencing the impacts of deforestation. The country's rapidly growing population has pushed agriculture and land development, leading to the clearing of large areas of forest land.\n\n## Causes of Deforestation\n\nThe following are some of the causes of deforestation in Nigeria:\n\n- Agriculture: Agriculture is one of the leading causes of deforestation in Nigeria. As the population grows, there is increased demand for food. This has led to the expansion of agricultural lands, which requires clearing of forests.\n\n- Logging: Logging for the production of timber is another significant cause of deforestation in Nigeria. The demand for wood for construction and furniture has led to the depletion of forest reserves.\n\n- Urbanization: Nigeria's rapidly growing cities have put pressure on forested lands. The need for urban infrastructure and the expansion of cities have led to the clearing of forests.\n\n## Impacts of Deforestation\n\nDeforestation has had several impacts on Nigeria, including:\n\n- Climate change: Deforestation contributes to climate change, which has had adverse effects on Nigeria. The country has experienced more frequent droughts, flooding, and desertification.\n\n- Loss of biodiversity: Nigeria's forests are home to a variety of plant and animal species. Deforestation has led to the loss of habitats and the extinction of some species.\n\n- Soil erosion: Trees help to hold the soil in place, prevent erosion, and regulate water cycle. Deforestation has led to soil erosion, which has affected the fertility of the soil and agricultural production.\n\n## Solutions to Deforestation\n\nThe following are some of the solutions to deforestation in Nigeria:\n\n- Afforestation: Afforestation involves planting new trees in areas that have been cleared. This will help to restore the forest cover and mitigate the effects of deforestation.\n\n- Conservation: The conservation of forest reserves and parks will help to protect the forests in Nigeria. The government should enact laws to protect these areas from logging and other destructive activities.\n\n- Sustainable agriculture: The promotion of sustainable agriculture practices such as crop rotation and agroforestry will help to reduce the need for the expansion of agricultural lands.\n\n![image: a dense forest with tall trees and greenery](https://cdn.pixabay.com/photo/2017/09/13/02/52/forest-2749380_960_720.jpg)\n\nIn conclusion, deforestation in Nigeria is a significant problem that requires urgent attention. The government, private sector, and individuals should work together to combat this problem and preserve Nigeria's natural resources for future generations.",
    subject: "Agriculture",
    topic: "Deforestation",
    updated_at: "2023-04-20T12:08:33.686086",
  };
  const classes = useStyles();
  const [markdown, setMarkdown] = useState(data.clean);

  useEffect(() => {
    let formatted = data.clean;
    data.images.map((image) => {
      formatted = formatted.replace(
        `[img:${image.id}]`,
        `![${image.prompt}](${image.url})`
      );
      setMarkdown(formatted);
    });
  }, []);
  //   useEffect(() => {
  //     fetch("https://www.markdownguide.org/api/v1/basic-syntax.json")
  //       .then((res) => res.json)
  //       .then((data) => console.log(data));
  //   }, []);
  //   console.log(markdown);

  return (
    <div className={classes.generator}>
      <Appdrawer />
      <Container className="markdownContainer">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Container>
    </div>
  );
}

export default Generator;
