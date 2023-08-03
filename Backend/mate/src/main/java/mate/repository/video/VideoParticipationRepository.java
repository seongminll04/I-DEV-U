package mate.repository.video;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mate.domain.video.VideoParticipation;

@Repository
public interface VideoParticipationRepository extends JpaRepository<VideoParticipation, Integer> {
	Optional<List<VideoParticipation>> findByUserEmail(String email);
}
