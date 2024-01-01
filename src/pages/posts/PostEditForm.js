import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    category: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
  });

  const { category, title, content, image, excerpt } = postData;

  // References the image form.file element
  const imageInput = useRef(null);

  // Used to redirect users to different pages
  const history = useHistory();
  // Used to get the id parameter out of the url
  const { id } = useParams();

  // Toolbar options module for React Quill editor
  var toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "video"],
    ["clean"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  // Function for editing posts
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Retrieves specific post with it's id
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { category, title, excerpt, content, image, is_owner } = data;
        // Checks if the user is the post owner, before updating
        // the fields below
        is_owner
          ? setPostData({ category, title, excerpt, content, image })
          : // If the user isn't the post owner, redirects to homepage
            history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
    // Only runs if history or id dependencies change
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Function for React Quill onChange attribute
  // Matches value to content
  const handleChangeContent = (value) => {
    setPostData((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };

  // Function for image field upload
  const handleChangeImage = (event) => {
    // First checks if there is a file
    if (event.target.files.length) {
      // In case the user decides to change their image
      // file after adding one, revoke is called
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

    // Assign each type of data to the correct variable defined above
    formData.append("category", category);
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);

    // First checks if the image input element already has a file in it
    if (imageInput?.current?.files[0]) {
      // If it does, appends the image
      formData.append("image", imageInput.current.files[0]);
    }

    // Need to refresh access token for sending an image file
    try {
      // put method to update existing post
      // Passes post id into api update string so it
      // knows which post to update
      await axiosReq.put(`/posts/${id}/`, formData);
      // Redirects to specific post after editing it
      history.push(`/posts/${id}`);
    } catch (error) {
      // console.log(error);
      // If the error status is NOT a 401 error
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}

      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Displays errors */}
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
        <ReactQuill
          theme="snow"
          modules={module}
          value={content}
          onChange={handleChangeContent}
        />
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
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-center">
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {/* Displays image preview if they have chosen one */}

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

              {/* Asterisk on accept is so that users can only upload images */}
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
            <div className="text-center">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;