import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";


// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";


import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    category: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
  });
  const { category, title, content, image, excerpt} = postData;

  const imageInput = useRef(null);

  const history = useHistory();

  // Toolbar options module for React Quill editor
  // var toolbarOptions = [
  //   [{ header: "1" }, { header: "2" }, { font: [] }],
  //   [{ size: [] }],
  //   ["bold", "italic", "underline", "strike", "blockquote"],
  //   [
  //     { list: "ordered" },
  //     { list: "bullet" },
  //     { indent: "-1" },
  //     { indent: "+1" },
  //   ],
  //   ["link", "video"],
  //   ["clean"],
  // ];
  // const module = {
  //   toolbar: toolbarOptions,
  // };

  //  // Function for React Quill onChange attribute
  // // Matches value to content
  // const handleChangeContent = (value) => {
  //   setPostData((prev) => {
  //     return {
  //       ...prev,
  //       content: value,
  //     };
  //   });
  // };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();


    formData.append("title", title);
    formData.append("category", category);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

<Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
        >
          <option value="world">World</option>
          <option value="environment">Environment</option>
          <option value="technology">Technology</option>
          <option value="design">Design</option>
          <option value="culture">Culture</option>
          <option value="business">Business</option>
          <option value="politics">Politics</option>
          <option value="opinion">Opinion</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
          <option value="style">Style</option>
          <option value="travel">Travel</option>
        </Form.Control>
      </Form.Group>
      {/* Displays errors */}
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Excerpt</Form.Label>
        <Form.Control
          type="text"
          name="excerpt"
          value={excerpt}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displays errors */}
      {errors?.excerpt?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
       <Form.Group>
        <Form.Label>Content</Form.Label>
        {/* <ReactQuill
          modules={module}
          className={styles.QlContainer}
          theme="snow"
          value={content}
          onChange={handleChangeContent}
          placeholder={"A canvas for your thoughts..."}
        /> */}
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;