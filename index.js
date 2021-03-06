window.onload = function () {
  initIframe();
};

// events available
const EVENT_MODULE = {
  INIT_MODULE: "INIT_MODULE",
  PROCESS_INIT: "PROCESS_INIT",
  PROCESS_ERROR: "PROCESS_ERROR",
  PROCESS_COMPLETED: "PROCESS_COMPLETED",
  MODULE_READY: "MODULE_READY",
};

// facetec credentials, provided by Na-at Technologies
const CREDENTIALS = {
  deviceKeyIdentifier: 'XXXXXXXXXXXXXXXXXX',
  baseURL: '',
  publicFaceScanEncryptionKey: '-----BEGIN PUBLIC KEY-----\n' +
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' +
    '-----END PUBLIC KEY-----',
  productionKeyText: {
    domains: 'XXXXXXXXXXXXXXXXXX',
    expiryDate: 'XXXX-XX-XX',
    key: 'XXXXXXXXXXXXXXXXXX'
  }
}

// optional, the app has default legends and colors
const CONFIGURATION = {
  views: {
    instructions: true
  },
  customization: {
    fadCustomization: {
      colors: {
        primary: "#A70635",
        secondary: "#A70635",
        tertiary: "#363636",
      },
      buttons: {
        primary: {
          backgroundColor: "#A70635",
          backgroundColorDisabled: "#dcdcdc",
          labelColor: "#ffffff",
          labelColorDisabled: "#8e8e8e",
          border: "1px solid #A70635",
        },
      },
      fonts: {
        title: {
          fontSize: '25px',
          fontFamily: 'system-ui'
        },
        subtitle: {
          fontSize: '17px',
          fontFamily: 'system-ui'
        },
        content: {
          fontSize: '15px',
          fontFamily: 'system-ui'
        },
        informative: {
          fontSize: '12px',
          fontFamily: 'system-ui'
        },
        button: {
          fontSize: '17px',
          fontFamily: 'system-ui'
        }
      }
    },

    moduleCustomization: {
      legends: {
        initializing: "Iniciando",
        processing: "procesando",
        facetec: {
          accessibilityCancelButton: "Cancelar",
          feedbackCenterFace: "Centra tu rostro",
          feedbackFaceNotFound: "Enfoca tu rostro",
          feedbackMoveAwayWeb: "Al??jate",
          feedbackMoveWebCloser: "Ac??rcate",
          feedbackMovePhoneAway: "Al??jate",
          feedbackMovePhoneCloser: "Ac??rcate",
          feedbackHoldSteady: "No te muevas",
          feedbackMoveWebEvenCloser: "A??n m??s cerca",
          instructionsHeaderReadyDesktop: "Biometr??a facial",
          instructionsMessageReadyDesktop: "Enfoca tu rostro en la gu??a y da clic en el bot??n para continuar",
          instructionsHeaderReadyMobile1: "Biometr??a facial",
          instructionsHeaderReadyMobile2: "",
          instructionsMessageReadyMobile1: "Enfoca tu rostro en la gu??a y",
          instructionsMessageReadyMobile2: "da clic en el bot??n para continuar",
          actionImReady: "Continuar",
          resultFacescanUploadMessage: "procesando",
          retryHeader: "Int??ntalo nuevamente",
          retrySubheaderMessage: "Necesitamos una imagen clara",
          retryYourImageLabel: "Tu foto",
          retryIdealImageLabel: "Pose ideal",
          retryInstructionMessage1: "Sin brillo o iluminaci??n extrema",
          retryInstructionMessage2: "Expresi??n neutral, sin sonre??r",
          retryInstructionMessage3: "Demasiado borroso, limpia tu c??mara",
          presessionFrameYourFace: "Enfoca tu rostro en la gu??a",
          presessionLookStraightAhead: "Mira al frente",
          presessionHoldSteady3: "No te muevas por: 3",
          presessionHoldSteady2: "No te muevas por: 2",
          presessionHoldSteady1: "No te muevas por: 1",
          presessionEyesStraightAhead: "Mira al frente",
          presessionRemoveDarkGlasses: "Qu??tate los lentes de sol",
          presessionNeutralExpression: "Expresi??n neutral, sin sonre??r",
          presessionConditionsTooBright: "Entorno com demasiada luz",
          presessionBrightenYourEnvironment: "Entorno con poca luz",
          actionTryAgain: "Aceptar",
          cameraPermissionHeader: "Permiso de c??mara o micr??fono desactivado",
          cameraPermissionMessage: "Por favor revisa la configuraci??n de tu sistema operativo y los ajustes del navegador.",
          cameraPermissionLaunchSettings: "Aceptar",
          initializingCamera: "iniciando",
          initializingCameraStillLoading: "iniciando...",
          resultSuccessMessage: "Validaci??n correcta",
          enterFullscreenHeader: "Prueba de vida",
          enterFullscreenMessage: "Antes de comenzar da clic en el bot??n de abajo para abrir en pantalla completa",
          enterFullscreenAction: "Continuar",
        },
      },
      legendsInstructions: {
        title: 'Prueba de vida',
        subtitle: 'Enfoca tu rostro en la gu??a',
        buttonNext: 'Continuar',
        instructions: 'Recuerda no hacer uso de lentes de sol, gorras u otros elementos que dificulten la identificaci??n de tu rostro.'
      }
    },
  },
  pathDependencies: {
    // imageDirectory: 'ASSETS_URL'
  }
};



// errors
const ERROR_CODE = {
  NEVER_INITIALIZED: 0,
  MISSING_GUIDANCE_IMAGES: 1,
  TIMEOUT: 2,
  CONTEXT_SWITCH: 3,
  PROGRAMMATICALLY_CANCELLED: 4,
  ORIENTATION_CHANGE_DURING_SESSION: 5,
  LANDSCAPE_MODE_NOT_ALLOWED: 6,
  USER_CANCELLED: 7,
  USER_CANCELLED_FROM_NEW_USER_GUIDANCE: 8,
  USER_CANCELLED_FROM_RETRY_GUIDANCE: 9,
  USER_CANCELLED_WHEN_ATTEMPTING_TO_GET_CAMERA_PERMISSIONS_: 10,
  LOCKED_OUT: 11,
  CAMERA_NOT_ENABLED: 12,
  NON_PRODUCTION_MODE_DEVICE_KEY_IDENTIFIER_INVALID: 13,
  DOCUMENT_NOT_READY: 14,
  SESSION_IN_PROGRESS: 15,
  CAMERA_NOT_RUNNING: 16,
  INITIALIZATION_NOT_COMPLETED: 17,
  UNKNOWN_INTERNAL_ERROR: 18,
  USER_CANCELLED_VIA_CLICKABLE_READY_SCREEN_SUBTEXT: 19,
  NOT_ALLOWED_USE_IFRAME_CONSTRUCTOR: 20,
  NOT_ALLOWED_USE_NON_IFRAME_CONSTRUCTOR: 21,
  I_FRAME_NOT_ALLOWED_WITHOUT_PERMISSION: 22,
  STILL_LOADING_RESOURCES: 23,
  RESOURCES_COULD_NOT_BE_LOADED_ON_LAST_INIT: 24,
  RESOURCES_COULD_NOT_BE_LOADED: 25,
  CREDENTIALS_REQUIRED: 26,
};

// models
class ResponseEvent {
  event;
  data;
  constructor(event, data) {
    this.event = event;
    this.data = data;
  }
}

class Result {
  img; // face image ( base64 )
  imgLowQuality; // low quality face image ( base64 )
  faceScan; // face scan data
  constructor(data) {
    this.img = data.auditTrail[0];
    this.imgLowQuality = data.lowQualityAuditTrail[0];
    this.faceScan = data.faceScan;
  }
}

// subscribe to message event to recive the events from the iframe
window.addEventListener("message", (message) => {
  // IMPORTANT: check the origin of the data
  if (message.origin.includes("firmaautografa.com")) {
    if (message.data.event === EVENT_MODULE.MODULE_READY) { // MODULE_READY
      // call initModule with the specific config
      initModule();
    }
    if (message.data.event === EVENT_MODULE.PROCESS_INIT) { // PROCESS_INIT
      // only informative
      console.log("Process init");
    } else if (message.data.event === EVENT_MODULE.PROCESS_ERROR) { // PRROCESS_ERROR
      console.log(message.data.data);
      if (message.data.data.code === ERROR_CODE.CAMERA_NOT_RUNNING) {
        // do something
        alert("C??mara no soportada, intenta en otro dispositivo");
      } else if (
        message.data.data.code === ERROR_CODE.INITIALIZATION_NOT_COMPLETED
      ) {
        // restart component
      } else {
        // restart component
        alert(JSON.stringify(message.data.data));
      }
    } else if (message.data.event === EVENT_MODULE.PROCESS_COMPLETED) { // PROCESS_COMPLETED

      console.log("Process completed");
      const result = new Result(message.data.data);
      const img = result.img;
      const imgLowQuality = result.imgLowQuality;
      const faceScan = result.faceScan;

      // use the results as you see fit
      // show result example
      const containerResult = document.getElementById("container-result");
      const containerIframe = document.getElementById("container-iframe-facetec");
      const imageId = document.getElementById("image-id");
      const imageFace = document.getElementById("image-face");
      const faceScanElement = document.getElementById("faceScan");

      containerIframe.style.display = "none";
      containerResult.style.display = "flex";
      imageId.src = "data:image/png;base64, " + img;
      imageFace.src = "data:image/png;base64, " + imgLowQuality;
      faceScanElement.innerHTML = faceScan;
    }
  } else return;
});

function initIframe() {
  // get iframe
  const iframe = document.getElementById("fad-iframe-facetec");
  // url - https://devapiframe.firmaautografa.com/fad-iframe-facetec
  const tkn = "SE13dVExbXVobWF0Z0dWbzlJNHBuWXpOdGhmODdibldJcnRXcTJtbjl6UE9HdXRCZWJRQWlFZ1FIdjR0MzdSWENNUFZFMUxKSTA1OEZtNC9tclZYUGpCdFlqVmF1OVVwZ2hvbWtyT25KNmNvZkN6My9qdjAreURxdmZ6Nm91MU4";
  const url = `https://devapiframe.firmaautografa.com/fad-iframe-facetec?tkn=${tkn}`;
  // set src to iframe
  iframe.src = url;
}

function initModule() {
  const iframe = document.getElementById("fad-iframe-facetec");
  iframe.contentWindow.postMessage(
    new ResponseEvent(EVENT_MODULE.INIT_MODULE, {
      credentials: CREDENTIALS,
      configuration: CONFIGURATION,
    }),
    iframe.src
  );
}