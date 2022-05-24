import { Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const DragNDrop = ({
  highlighted,
  setHighlighted,
  inputRef,
  handleChange,
  media,
  setMedia,
  mediaPreview,
  setMediaPreview,
}) => {
  return (
    <>
  <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="media"
            ref={inputRef}
          />
          <div
            style={{ cursor: "pointer" }}
            onDragOver={(e) => {
              e.preventDefault();
              setHighlighted(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setHighlighted(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighlighted(true);

              const droppedFile = e.dataTransfer.files[0];
              setMedia(droppedFile);
              setMediaPreview(URL.createObjectURL(droppedFile));
            }}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            {mediaPreview === null ? (
              <>
                <Segment 
                {...(highlighted && {color: "green"})}
                placeholder basic>
                  <Header icon>
                    <Icon name="file image outline" />
                    Drag N Drop Image To Upload
                  </Header>
                </Segment>
              </>
            ) : (
              <>
                <Segment placeholder>
                  <Image
                    src={mediaPreview}
                    size="medium"
                    centered
                    alt="description of image"
                    style={{ cursor: "pointer" }}
                    // onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default DragNDrop;
