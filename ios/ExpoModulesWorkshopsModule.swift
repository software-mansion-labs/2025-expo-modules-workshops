import ExpoModulesCore

internal struct CustomObject: Record {
  @Field var index: Int = 0
  @Field var data: String = ""
}

public class ExpoModulesWorkshopsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoModulesWorkshops")

    Function("multiply") { (a: Int, b: Int) in
      return a * b
    }
    
    Function("passString") { (str: String) in
      return str + " new string"
    }
    
    Function("passArray") { (arr: [Int]) in
      return arr + [5]
    }
    
    Function("passObject") { (obj: CustomObject) in
      obj.index += 1
      obj.data += " new data"
      return obj
    }
    
    Function("passFunction") { (funcToCall: JavaScriptFunction<Void?>) in
      try funcToCall.call(10)
    }
    
    AsyncFunction("getPromise") { (data: String, promise: Promise) in
      promise.resolve(data + " new string")
      self.sendEvent("onEvent", ["data": "Ready!"])
    }

    Events("onEvent")
    
    Events("onScreenOrientationChange")
    
    Function("getScreenOrientation") {
      return getScreenOrientation()
    }
    
    OnCreate() {
      NotificationCenter.default.addObserver(
        self,
        selector: #selector(didChangeOrientation),
        name: UIDevice.orientationDidChangeNotification,
        object: nil
      )
    }

    View(ExpoMapView.self) {
      Prop("mapType") { (view: ExpoMapView, mapType: String) in
        if (mapType == "hybrid") {
          view.mapView.mapType = .hybrid
        } else if (mapType == "satellite") {
          view.mapView.mapType = .satellite
        } else {
          view.mapView.mapType = .standard
        }
      }
      Events("onMapPress", "onRegionChange")
      
      AsyncFunction("moveTo") { (view: ExpoMapView, lat: Double, lon: Double, animated: Bool) in
        view.moveTo(latitude: lat, longitude: lon, animated: animated)
      }
    }

  }

  @objc func didChangeOrientation() {
    self.sendEvent("onScreenOrientationChange", [
      "orientation": getScreenOrientation()
    ])
  }

  func getScreenOrientation() -> String {
    let orientation = UIDevice.current.orientation
    switch orientation {
    case .portrait, .portraitUpsideDown, .faceUp, .faceDown:
      return "VERTICAL"
    case .landscapeLeft, .landscapeRight:
      return "HORIZONTAL"
    default:
      return "UNKNOWN"
    }
  }

}
