package mate.repository.video;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.video.VideoRoom;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoRoom, Integer> {
	VideoRoom findVideoRoomByIdx(int idx);
}
