import github from '/github.svg';

export default function Footer() {
  return (
    <div className="text-xl text-white p-4 bg-primary text-center flex justify-center gap-2">
        Himanshu-shukla
        <a href="https://github.com/himanshushukla02/SpotSaver" target="blank"><img src={github} className="max-h-6 align-bottom"/></a>
    </div>
  )
}
