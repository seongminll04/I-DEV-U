package mate.repository.video;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mate.domain.video.VideoRoom;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<VideoRoom, Integer> {
	VideoRoom findVideoRoomByIdx(int idx);

	@Query("select v from VideoRoom v where v.idx = :idx")
	Optional<VideoRoom> findRoom(@Param("idx") Integer idx);

	VideoRoom findVideoRoomByOvSession(String ovSession);
}
