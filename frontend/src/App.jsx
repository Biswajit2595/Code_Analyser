import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const toast = useToast();
  const inputRef = useRef(null);
  const [code, setCode] = useState("// Enter Your Code Here");
  const [convertedCode, setConvertedCode] = useState(
    "Your Output Will Be Shown Here"
  );
  const [language, setLanguage] = useState("");
  const [url,setUrl]=useState("")

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.editor.focus();
    }
  };
  useEffect(() => {
    inputFocus();
  });

  const handleSubmit=()=>{
      let newUrl = url.trim().split("/");
      let owner = newUrl[3];
      let repo = newUrl[4];
      let filepath = newUrl.slice(7).join("/");


      if(newUrl[5]!=="blob" && newUrl[6]!=="main" || newUrl.length===7){
        toast({
          status:"warning",
          title:"Please Enter a Valid github Url",
          isClosable:true,
          duration:2000,
          position:"top"
      })
      setUrl("")
      return
      }

      axios.post(`http://localhost:4000/github`,{owner,repo,filepath})
      .then(res=>{
        console.log(res.data)
        setCode(res.data)
        setUrl("")
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const handleDebug = () => {
    if (code === "// Enter Your Code Here" || code === "") {
      toast({
        position: "top",
        title: "No Code found",
        description:
          "You haven't provided any code for me to review and enhance.Please provide some code and try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      axios
        .post(`http://localhost:4000/debug`, { code })
        .then((res) => {
          // console.log(res.data.data);
          setConvertedCode(res.data.data);
        })
        .catch((error) => {
          console.log(error);
          setConvertedCode("A network error occured, please try again!");
        });
    }
  };

  const handleConvert = () => {
    if (code === "// Enter Your Code Here" || code === "") {
      toast({
        position: "top",
        title: "No Code found",
        description:
          "You haven't provided any code to convert.Please provide some code and try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      axios
        .post(`http://localhost:4000/convert`, {
          code,
          language,
        })
        .then((res) => {
          // console.log(res.data.data);
          setConvertedCode(res.data.data);
          setLanguage("");
        })
        .catch((error) => {
          console.log(error);
          setConvertedCode("A network error occured, please try again!");
        });
    }
  };

  const handleQuality = () => {
    if (code === "// Enter Your Code Here" || code === "") {
      toast({
        position: "top",
        title: "No Code found",
        description:
          "You haven't provided any code for me to do quality Check.Please provide some code and try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      axios
        .post(`http://localhost:4000/quality`, { code })
        .then((res) => {
          console.log(res.data)
          setConvertedCode(res.data.data);
        })
        .catch((error) => {
          console.log(error.message);
          setConvertedCode("A network error occured, please try again!");
        });
    }
  };
  const handleInput = (val) => {
    setCode(val);
  };

  return (
    <Box w="100vw" margin="auto" bg="gray.600">
      <Heading backgroundColor={"gray.300"} textAlign="center" p={2}>
        CODE ANALYSER
      </Heading>
      <Flex bg="gray.600" justifyContent="space-around" p={5} boxShadow="md">
        <Select
          width="30%"
          color={"gray.900"}
          fontWeight={700}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">SELECT LANGUAGE</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
        </Select>
        <Button
          colorScheme="telegram"
          variant="solid"
          isDisabled={!language}
          onClick={handleConvert}
          _hover={{ background: "#f9d015", color: "black" }}
        >
          CONVERT
        </Button>
        <Button
          colorScheme="telegram"
          variant="solid"
          _hover={{ background: "#f9d015", color: "black" }}
          onClick={handleDebug}
        >
          DEBUG
        </Button>
        <Button
          colorScheme="telegram"
          variant="solid"
          _hover={{ background: "#f9d015", color: "black" }}
          onClick={handleQuality}
        >
          QUALITY CHECK
        </Button>
      </Flex>
      <Flex m="auto" w={{base:"80%",sm:"80%",md:"60%",lg:"50%"}} bg="gray.600">
        <Input
          bg="gray.200"
          p="12px"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          placeholder="Enter Your Github url here"
        />
        <Button
          colorScheme="telegram"
          variant="solid"
          isDisabled={!url}
          _hover={{ background: "#f9d015", color: "black" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Flex>
      <Flex bg="gray.200">
        <Box width="50%" bg={"blackAlpha.600"} p={1.5}>
          <Editor
            ref={inputRef}
            value={code}
            height="90vh"
            width="100%"
            mode="javascript"
            theme="vs-dark"
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            editorProps={{ $blockScrolling: true }}
            onChange={handleInput}
          />
        </Box>
        <Box width="50%" color={"#fff"} bg={"blackAlpha.700"} p={5}>
          <h2 style={{ color: "white", fontWeight: "600" }}>Output</h2>
          <ReactMarkdown>{convertedCode}</ReactMarkdown>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
