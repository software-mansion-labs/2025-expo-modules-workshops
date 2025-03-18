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
      "longitude": coordinate.longitude,
      "latitude": coordinate.latitude,
    ])
  }

  override func layoutSubviews() {
    mapView.frame = bounds
  }
  
  func moveTo(latitude: Double, longitude: Double, animated: Bool) {
    let center = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    mapView.setCenter(center, animated: animated)
  }
  
  func setCameraCenter(latitude: Double, longitude: Double) {
    let location = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    let span = MKCoordinateSpan(latitudeDelta: 0.1, longitudeDelta: 0.1)
    let region = MKCoordinateRegion(center: location, span: span)
    mapView.setRegion(region, animated: false)
  }
  
  func addMarker(latitude: Double, longitude: Double) {
    let marker = MKPointAnnotation()
    marker.coordinate = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    mapView.addAnnotation(marker)
  }
}
