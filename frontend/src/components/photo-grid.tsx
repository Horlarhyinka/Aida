import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  IconButton,
  BoxProps,
  ImageProps,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import Gallery from "react-photo-gallery";
import { useSwipeable } from "react-swipeable"; // Import swipe handler

interface Prop extends BoxProps{
  images: string[];
  onClose?: () => void;
  imageProp?: ImageProps;
  imageWrapperProp?: BoxProps
}

const ImageGrid = ({ images, onClose, ...rest }: Prop) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track currently viewed image

  const visibleImages = images.slice(0, 3).map((src) => ({
    src,
    width: 1/(images.length > 4? 4: images.length),
    height: 1/(images.length > 4? 4: images.length),
  }));
  const extraCount = images.length - 3;

  // Open modal with all images
  const handleOpen = (index: number) => {
    setSelectedImages(images);
    setCurrentIndex(index); // Start from clicked image
    onOpen();
  };

  // Move to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
  };

  // Move to the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true, // Enable swiping with mouse
  });

  return (
    <>
      {/* Grid Layout */}
      <Box position="relative" {...rest}>
        {onClose && <CloseIcon zIndex={10} bg={'white'} rounded={'full'} position={'absolute'} top={'0px'} right={'0px'} onClick={onClose} />}
        <Gallery
          photos={visibleImages}
          renderImage={({ photo, index }) => (
            <Box position="relative" key={index} onClick={() => handleOpen(index)} cursor="pointer" {...(rest.imageWrapperProp ?? {})} >
              <Image {...(rest.imageProp ?? {})} src={photo.src} alt={`Attachment ${index}`} m={1} borderRadius="md" />
              {index === 2 && extraCount > 0 && (
                <Flex
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  background="rgba(0, 0, 0, 0.6)"
                  color="white"
                  justify="center"
                  align="center"
                  fontSize="lg"
                  fontWeight="bold"
                  borderRadius="md"
                >
                  <Text>+{extraCount} more</Text>
                </Flex>
              )}
            </Box>
          )}
        />
      </Box>

      {/* Modal for Viewing All Images */}
      <Modal isOpen={isOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white" {...swipeHandlers}>
          <ModalCloseButton />

          <ModalBody p={4} display="flex" alignItems="center" justifyContent="center">
            {/* Previous Button */}
            <IconButton
              aria-label="Previous image"
              icon={<ArrowLeftIcon />}
              position="absolute"
              left="20px"
              top="50%"
              transform="translateY(-50%)"
              size="lg"
              onClick={handlePrev}
              zIndex={10}
              bg="rgba(0, 0, 0, 0.5)"
              _hover={{ bg: "rgba(0, 0, 0, 0.7)" }}
            />

            {/* Display Current Image */}
            <Image
              src={selectedImages[currentIndex]}
              alt={`Image ${currentIndex}`}
              maxH="80vh"
              borderRadius="md"
            />

            {/* Next Button */}
            <IconButton
              aria-label="Next image"
              icon={<ArrowRightIcon />}
              position="absolute"
              right="20px"
              top="50%"
              transform="translateY(-50%)"
              size="lg"
              onClick={handleNext}
              zIndex={10}
              bg="rgba(0, 0, 0, 0.5)"
              _hover={{ bg: "rgba(0, 0, 0, 0.7)" }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageGrid;
