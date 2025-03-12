import ExpoModulesCore
import MapKit

class ExpoMapView: ExpoView {
  let mapView = MKMapView()
  let onMapPress = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    addSubview(mapView)
    let tapHandler = UITapGestureRecognizer(target: self, action: #selector(handleMapPress(_:)))
    mapView.addGestureRecognizer(tapHandler)
  }
  
  @objc func handleMapPress(_ gesture: UITapGestureRecognizer) {
    let locationInView = gesture.location(in: mapView)
    let coordinate = mapView.convert(locationInView, toCoordinateFrom: mapView)
    onMapPress.callAsFunction([
      "location": [
        "longitude": coordinate.longitude,
        "latitude": coordinate.latitude,
      ]
    ])
  }

  override func layoutSubviews() {
    mapView.frame = bounds
  }
  
  func moveTo(latitude: Double, longitude: Double, animated: Bool) {
    let center = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    mapView.setCenter(center, animated: animated)
  }
}
