window.onload = function () {
 initProcess();
};

// facetec credentials, provided by Na-at Technologies
const CREDENTIALS = {
 deviceKeyIdentifier: 'XXXXXXXXXXXXXXXXXX',
 baseURL: '',
 publicFaceScanEncryptionKey:
  '-----BEGIN PUBLIC KEY-----\n' +
  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
  '-----END PUBLIC KEY-----',
 productionKeyText: {
  domains: 'XXXXXXXXXXXXXXXXXX',
  expiryDate: 'XXXX-XX-XX',
  key: 'XXXXXXXXXXXXXXXXXX',
 },
};

// optional, the app has default legends and colors
const CONFIGURATION = {
 views: {
  instructions: true,
 },
 customization: {
  fadCustomization: {
   colors: {
    primary: '#A70635',
    secondary: '#A70635',
    tertiary: '#363636',
    succesful: '#5A9A92',
   },
   buttons: {
    primary: {
     backgroundColor: '#A70635',
     labelColor: '#ffffff',
     borderColor: '#A70635',
     borderStyle: 'solid',
     borderWidth: '1px',
    },
    common: {
     backgroundColorDisabled: '#dcdcdc',
     labelColorDisabled: '#8e8e8e',
    },
   },
   fonts: {
    title: {
     fontSize: '25px',
     fontFamily: 'system-ui',
    },
    subtitle: {
     fontSize: '17px',
     fontFamily: 'system-ui',
    },
    content: {
     fontSize: '15px',
     fontFamily: 'system-ui',
    },
    informative: {
     fontSize: '12px',
     fontFamily: 'system-ui',
    },
    button: {
     fontSize: '17px',
     fontFamily: 'system-ui',
    },
   },
  },

  moduleCustomization: {
   legends: {
    initializing: 'Iniciando',
    processing: 'procesando',
    facetec: {
     accessibilityCancelButton: 'Cancelar',
     feedbackCenterFace: 'Centra tu rostro',
     feedbackFaceNotFound: 'Enfoca tu rostro',
     feedbackMoveAwayWeb: 'Aléjate',
     feedbackMoveWebCloser: 'Acércate',
     feedbackMovePhoneAway: 'Aléjate',
     feedbackMovePhoneCloser: 'Acércate',
     feedbackHoldSteady: 'No te muevas',
     feedbackMoveWebEvenCloser: 'Aún más cerca',
     instructionsHeaderReadyDesktop: 'Biometría facial',
     instructionsMessageReadyDesktop: 'Enfoca tu rostro en la guía y da clic en el botón para continuar',
     instructionsHeaderReadyMobile1: 'Biometría facial',
     instructionsHeaderReadyMobile2: '',
     instructionsMessageReadyMobile1: 'Enfoca tu rostro en la guía y',
     instructionsMessageReadyMobile2: 'da clic en el botón para continuar',
     actionImReady: 'Continuar',
     resultFacescanUploadMessage: 'procesando',
     retryHeader: 'Inténtalo nuevamente',
     retrySubheaderMessage: 'Necesitamos una imagen clara',
     retryYourImageLabel: 'Tu foto',
     retryIdealImageLabel: 'Pose ideal',
     retryInstructionMessage1: 'Sin brillo o iluminación extrema',
     retryInstructionMessage2: 'Expresión neutral, sin sonreír',
     retryInstructionMessage3: 'Demasiado borroso, limpia tu cámara',
     presessionFrameYourFace: 'Enfoca tu rostro en la guía',
     presessionLookStraightAhead: 'Mira al frente',
     presessionHoldSteady3: 'No te muevas por: 3',
     presessionHoldSteady2: 'No te muevas por: 2',
     presessionHoldSteady1: 'No te muevas por: 1',
     presessionEyesStraightAhead: 'Mira al frente',
     presessionRemoveDarkGlasses: 'Quítate los lentes de sol',
     presessionNeutralExpression: 'Expresión neutral, sin sonreír',
     presessionConditionsTooBright: 'Entorno com demasiada luz',
     presessionBrightenYourEnvironment: 'Entorno con poca luz',
     actionTryAgain: 'Aceptar',
     cameraPermissionHeader: 'Permiso de cámara o micrófono desactivado',
     cameraPermissionMessage: 'Por favor revisa la configuración de tu sistema operativo y los ajustes del navegador.',
     cameraPermissionLaunchSettings: 'Aceptar',
     initializingCamera: 'iniciando',
     initializingCameraStillLoading: 'iniciando...',
     resultSuccessMessage: 'Validación correcta',
     enterFullscreenHeader: 'Prueba de vida',
     enterFullscreenMessage: 'Antes de comenzar da clic en el botón de abajo para abrir en pantalla completa',
     enterFullscreenAction: 'Continuar',
    },
   },
   legendsInstructions: {
    title: 'Prueba de vida',
    subtitle: 'Enfoca tu rostro en la guía',
    buttonNext: 'Continuar',
    instructions: 'Recuerda no hacer uso de lentes de sol, gorras u otros elementos que dificulten la identificación de tu rostro.',
   },
   style: {
    common: {
     loader: {
      animationColor: '#FFFFFF',
      backgroundColor: '#000000',
      labelColor: '#FFFFFF',
     },
    },
   },
  },
 },
 pathDependencies: {
  imagesInstructions: {
  //  instruction: 'Custom image URL',
  },
  images: {
  //  retryScreenSlideshowImage: 'Custom image URL',
  },
 },
};

async function initProcess() {
 const tkn = 'TOKEN';
 const options = {
  environment: FadSdk.getFadEnvironments().UAT,
 };

 try {
  const FAD_SDK = new FadSdk(tkn, options);

	const facetecResponse = await FAD_SDK.startFacetec(CREDENTIALS, CONFIGURATION);
	FAD_SDK.end();
	console.log(facetecResponse);
	const img = facetecResponse.auditTrail[0];
	const imgLowQuality = facetecResponse.lowQualityAuditTrail[0];
	const faceScan = facetecResponse.faceScan;

	// use the results as you see fit
	// show result example
	const containerResult = document.getElementById('container-result');
	const imageId = document.getElementById('image-id');
	const imageFace = document.getElementById('image-face');
	const faceScanElement = document.getElementById('faceScan');

	containerResult.style.display = 'flex';
	imageId.src = 'data:image/png;base64, ' + img;
	imageFace.src = 'data:image/png;base64, ' + imgLowQuality;
	faceScanElement.innerHTML = faceScan;
 } catch (ex) {
  // PRROCESS_ERROR
  console.log(ex);
  if (ex.code === FadSdk.Errors.Facetec.Session.CAMERA_NOT_RUNNING) {
   // do something
   alert('Cámara no soportada, intenta en otro dispositivo');
  } else if (ex.code === FadSdk.Errors.Facetec.Session.INITIALIZATION_NOT_COMPLETED) {
   // restart component
  } else {
   // restart component
   alert(JSON.stringify(ex));
  }
 }
}
