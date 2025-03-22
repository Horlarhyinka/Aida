import { BoxProps, Box, useDisclosure , Modal, ModalBody, ModalHeader, ModalContent, ModalOverlay, Button, VStack, Image, Text} from "@chakra-ui/react";
import ReportedIcn from '../../assets/svg/verified.svg'



const ReportModal = (prop: BoxProps) =>{
const { children } = prop
const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {
        children? <Box onClick={onOpen}>{children}</Box>: <Button onClick={onOpen}>Open Modal</Button>
    }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px='56px' py='48px' minW='800px' >
          <ModalHeader w='100%' fontWeight={'500'} fontSize={'2rem'} color={'gray.200'} textAlign={'center'} >Report an emergency</ModalHeader>
          <ModalBody mt='56px' >
            <VStack align={'center'} spacing={'0px'} >
                <Image src={ReportedIcn} alt="Verified" />
                <VStack>
                    <Text></Text>
                    <Text></Text>
                </VStack>

                <VStack>
                    <Button>Go to Emergency Room</Button>
                </VStack>

            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReportModal